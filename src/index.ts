// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: https://codemirror.net/LICENSE

// Code below adapted from jupyterlab-stata-highlight, jupyterlab-stata-highlight2, and codemirror-legacy-stata
// Distributed under an MIT license: https://github.com/kylebarron/jupyterlab-stata-highlight/blob/master/LICENSE

import { StreamLanguage, LanguageSupport } from '@codemirror/language';
import { JupyterFrontEnd } from '@jupyterlab/application';
import { IEditorLanguageRegistry } from '@jupyterlab/codemirror';
import { stata } from './stata';

// Export the extension
export default [
  {
    id: 'jupyterlab-stata-highlight3',
    requires: [IEditorLanguageRegistry],
    autoStart: true,
    activate: (app: JupyterFrontEnd, registry: IEditorLanguageRegistry) => {
      console.log(
        'Activating Stata highlighting extension for JupyterLab 4.0+'
      );

      // Register the language mode with CodeMirror
      registry.addLanguage({
        name: 'stata',
        displayName: 'Stata',
        extensions: ['.do', '.ado'],
        mime: 'text/x-stata',
        load: async () => {
          return new LanguageSupport(StreamLanguage.define(stata));
          // See https://github.com/jupyterlab/extension-examples/README.md
        }
      });

      // Register file type for Stata
      app.docRegistry.addFileType({
        name: 'stata',
        displayName: 'Stata',
        extensions: ['.do', '.ado'],
        mimeTypes: ['text/x-stata']
      });
    }
  }
];
