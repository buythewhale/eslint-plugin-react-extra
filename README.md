# eslint-plugin-react-extra

ESLint rules to use with React

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-react-extra`:

```
$ npm install eslint-plugin-react-extra --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-react-extra` globally.

## Usage

Add `react-extra` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "react-extra"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "react-extra/rule-name": 2
    }
}
```

## Supported Rules

* [react-extra/no-inline-styles](docs/rules/no-inline-styles.md): Disallow inline styles
