# JupyterLab Extension for Stata Syntax Highlighting

[![PyPI](https://github.com/lutherbu/jupyterlab_stata_highlight3/actions/workflows/python-publish.yml/badge.svg?event=release)](https://github.com/lutherbu/jupyterlab_stata_highlight3/actions/workflows/python-publish.yml)

Stata syntax highlighting for JupyterLab 4+.

## Requirements

- JupyterLab >= 4.0

## Install

```bash
pip install jupyterlab_stata_highlight3
```

## Contributing

### Development install

```bash
# clone the repository
git clone https://github.com/lutherbu/jupyterlab_stata_highlight3.git

# go to the repository folder
cd jupyterlab_stata_highlight3

# install the extension in editable mode
python -m pip install -e .

# install your development version of the extension with JupyterLab
jupyter labextension develop . --overwrite

# build the TypeScript source after making changes
jlpm run build

# start JupyterLab
jupyter lab
```

## Credits and Licenses

- [jupyterlab-stata-highlight](https://github.com/kylebarron/jupyterlab-stata-highlight/): making all these possible by [kylebarron](https://github.com/kylebarron)
- [jupyterlab_stata_highlight2](https://github.com/hugetim/jupyterlab_stata_highlight2): prebuilt package on PyPI by [hugetim](https://github.com/hugetim)
- [codemirror-legacy-stata](https://github.com/ticoneva/codemirror-legacy-stata): hack by [ticoneva](https://github.com/ticoneva) based on [@codemirror/legacy-modes](https://github.com/codemirror/legacy-modes)
- [codemirror-extension](https://github.com/lutherbu/extension-examples/tree/main/codemirror-extension): extension examples for JupyterLab 4.0+
- ChatGPT: for TypeScript ... :sweat_smile:

Please follow licenses specified above (if any)
