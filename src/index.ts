// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: https://codemirror.net/LICENSE

// Code below adapted from jupyterlab-stata-highlight, jupyterlab-stata-highlight2, and codemirror-legacy-stata
// Distributed under an MIT license: https://github.com/kylebarron/jupyterlab-stata-highlight/blob/master/LICENSE

import { simpleMode } from '@codemirror/legacy-modes/mode/simple-mode';
import { StreamLanguage, LanguageSupport } from '@codemirror/language';
import { JupyterFrontEnd } from '@jupyterlab/application';
import { IEditorLanguageRegistry } from '@jupyterlab/codemirror';
import { ISettingRegistry } from '@jupyterlab/settingregistry';
import { builtins_str, builtins_fun_str, color_translator } from './stata';

export default [
  {
    id: 'jupyterlab-stata-highlight3',
    requires: [IEditorLanguageRegistry, ISettingRegistry],
    autoStart: true,
    activate: async (
      app: JupyterFrontEnd,
      registry: IEditorLanguageRegistry,
      settings: ISettingRegistry
    ) => {
      console.log('Activating Stata highlighting extension with settings');
      console.log(app.commands);

      // Read the settings
      const setting = await settings.load(
        'jupyterlab-stata-highlight3:settings'
      );
      const customKeywords = setting.get('keyword').composite as string[];
      let keywords_all = builtins_str;
      if (customKeywords.length === 0) {
        console.log('No custom keywords found! ');
      } else {
        console.log('Read custom keywords: ' + customKeywords.join(', '));
        keywords_all =
          builtins_str.slice(0, -1) + '|' + customKeywords.join('|') + ')';
      }
      const stataMode = simpleMode({
        // The start state contains the rules that are initially used
        start: [
          // Comments
          {
            regex: /\/\/\/?.*$/,
            token: color_translator['comment'],
            sol: true
          },
          { regex: /(\s)\/\/\/?.*$/, token: color_translator['comment'] },
          { regex: /\s*\*.*$/, token: color_translator['comment'], sol: true },
          {
            regex: /\/\*/,
            token: color_translator['comment'],
            push: 'comments_block'
          },

          // Strings
          {
            regex: /"/,
            token: color_translator['string'],
            push: 'string_regular'
          },
          {
            regex: /`"/,
            token: color_translator['string'],
            push: 'string_compound'
          },

          // Macros
          {
            regex: /`/,
            token: color_translator['variable-2'],
            push: 'macro_local'
          },
          {
            regex: /\$/,
            token: color_translator['variable-2'],
            push: 'macro_global'
          },

          // Keywords
          // There are two separate dictionaries because the `\b` at the beginning of the regex seemed not to work. So instead, I either match the preceding space before the keyword or require the keyword to be at beginning of the string. I think this necessitates two different strings.
          {
            regex: new RegExp('\\s' + keywords_all + '(?![\\(\\w])'),
            token: color_translator['keyword']
          },
          {
            regex: new RegExp(keywords_all + '\\b'),
            token: color_translator['keyword'],
            sol: true
          },
          {
            regex: new RegExp('(\\W)' + builtins_fun_str),
            token: ['', color_translator['def']]
          },
          // change null to "" in TypeScript
          // {regex: /\s\w+(?=\()/, token: color_translator['def']},

          { regex: /[{]/, indent: true },
          { regex: /[}]/, dedent: true }

          // {regex: /-|==|<=|>=|<|>|&|!=/, token: 'operator'},
          // {regex: /\*|\+|\^|\/|!|~|=|~=/, token: 'operator'},
        ],
        comments_block: [
          {
            regex: /\/\*/,
            token: color_translator['comment'],
            push: 'comments_block'
          },
          // this ends and restarts a comment block. but need to catch this so
          // that it doesn\'t start _another_ level of comment blocks
          { regex: /\*\/\*/, token: color_translator['comment'] },
          {
            regex: /(\*\/\s+\*(?!\/)[^\n]*)|(\*\/)/,
            token: color_translator['comment'],
            pop: true
          },
          // Match anything else as a character inside the comment
          { regex: /./, token: color_translator['comment'] }
        ],

        string_compound: [
          {
            regex: /`"/,
            token: color_translator['string'],
            push: 'string_compound'
          },
          { regex: /"'/, token: color_translator['string'], pop: true },
          {
            regex: /`/,
            token: color_translator['variable-2'],
            push: 'macro_local'
          },
          {
            regex: /\$/,
            token: color_translator['variable-2'],
            push: 'macro_global'
          },
          { regex: /./, token: color_translator['string'] }
        ],
        string_regular: [
          { regex: /"/, token: color_translator['string'], pop: true },
          {
            regex: /`/,
            token: color_translator['variable-2'],
            push: 'macro_local'
          },
          {
            regex: /\$/,
            token: color_translator['variable-2'],
            push: 'macro_global'
          },
          { regex: /./, token: color_translator['string'] }
        ],
        macro_local: [
          {
            regex: /`/,
            token: color_translator['variable-2'],
            push: 'macro_local'
          },
          { regex: /'/, token: color_translator['variable-2'], pop: true },
          { regex: /./, token: color_translator['variable-2'] }
        ],
        macro_global: [
          { regex: /\}/, token: color_translator['variable-2'], pop: true },
          {
            regex: /.(?=[^\w{}])/,
            token: color_translator['variable-2'],
            pop: true
          },
          { regex: /./, token: color_translator['variable-2'] }
        ],
        languageData: {
          name: 'stata'
        }
      });

      // Register file type
      app.docRegistry.addFileType({
        name: 'stata',
        displayName: 'Stata',
        extensions: ['.do', '.ado'],
        mimeTypes: ['text/x-stata']
      });

      // Register the language
      registry.addLanguage({
        name: 'stata',
        displayName: 'Stata',
        // Note that IEditorLanguage.extensions do not have "."
        extensions: ['do', 'ado'],
        mime: 'text/x-stata',
        load: async () => {
          return new LanguageSupport(StreamLanguage.define(stataMode));
        }
      });

      console.log('Stata highlighting activated with custom settings.');
    }
  }
];
