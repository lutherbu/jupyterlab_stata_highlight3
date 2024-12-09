# JupyterLab Extension for Stata Syntax Highlighting

[![Github Actions Status](https://github.com/lutherbu/jupyterlab_stata_highlight3/workflows/Build/badge.svg)](https://github.com/lutherbu/jupyterlab_stata_highlight3/actions/workflows/build.yml)

Stata syntax highlighting for JupyterLab 4+.

## Requirements

- JupyterLab >= 4.0.0

## Install

To install the extension, execute:

```bash
pip install jupyterlab_stata_highlight3
```

## Uninstall

To remove the extension, execute:

```bash
pip uninstall jupyterlab_stata_highlight3
```

## Customize Keywords

![](preview.jpeg)

## Contributing

### Development install

Note: You will need NodeJS to build the extension package.

The `jlpm` command is JupyterLab's pinned version of
[yarn](https://yarnpkg.com/) that is installed with JupyterLab. You may use
`yarn` or `npm` in lieu of `jlpm` below.

```bash
# Clone the repo to your local environment
# Change directory to the jupyterlab_stata_highlight3 directory
# Install package in development mode
pip install -e "."
# Link your development version of the extension with JupyterLab
jupyter labextension develop . --overwrite
# Rebuild extension Typescript source after making changes
jlpm build
```

You can watch the source directory and run JupyterLab at the same time in different terminals to watch for changes in the extension's source and automatically rebuild the extension.

```bash
# Watch the source directory in one terminal, automatically rebuilding when needed
jlpm watch
# Run JupyterLab in another terminal
jupyter lab
```

With the watch command running, every saved change will immediately be built locally and available in your running JupyterLab. Refresh JupyterLab to load the change in your browser (you may need to wait several seconds for the extension to be rebuilt).

By default, the `jlpm build` command generates the source maps for this extension to make it easier to debug using the browser dev tools. To also generate source maps for the JupyterLab core extensions, you can run the following command:

```bash
jupyter lab build --minimize=False
```

### Development uninstall

```bash
pip uninstall jupyterlab_stata_highlight3
```

In development mode, you will also need to remove the symlink created by `jupyter labextension develop`
command. To find its location, you can run `jupyter labextension list` to figure out where the `labextensions`
folder is located. Then you can remove the symlink named `jupyterlab-stata-highlight3` within that folder.

### Packaging the extension

See [RELEASE](RELEASE.md)

## Credits and Licenses

- [jupyterlab-stata-highlight](https://github.com/kylebarron/jupyterlab-stata-highlight/): making all these possible by [kylebarron](https://github.com/kylebarron)
- [jupyterlab_stata_highlight2](https://github.com/hugetim/jupyterlab_stata_highlight2): prebuilt package on PyPI by [hugetim](https://github.com/hugetim)
- [codemirror-legacy-stata](https://github.com/ticoneva/codemirror-legacy-stata): hack by [ticoneva](https://github.com/ticoneva) based on [@codemirror/legacy-modes](https://github.com/codemirror/legacy-modes)
- [codemirror-extension](https://github.com/lutherbu/extension-examples/tree/main/codemirror-extension): extension examples for JupyterLab 4+
- [extension-template](https://github.com/jupyterlab/extension-template): a copier template for extension on JupyterLab 4+
- ChatGPT: for TypeScript ... :sweat_smile:

Please follow licenses specified above (if any)
