module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:react/recommended', 'prettier', "plugin:prettier/recommended"],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react', 'prettier'],
  settings: {
    react: {
      createClass: 'createReactClass',
      pragma: 'React',
      fragment: 'Fragment',
      version: 'detect',
      flowVersion: '0.53',
    },
    propWrapperFunctions: [
      'forbidExtraProps',
      {
        property: 'freeze',
        object: 'Object',
      },
      {
        property: 'myFavoriteWrapper',
      },
    ],
    linkComponents: [
      'Hyperlink',
      {
        name: 'Link',
        linkAttribute: 'to',
      },
    ],
  },
  rules: {
    'indent': [
      'error',
      2,
      {
        SwitchCase: 1,
      },
    ],
    'no-await-in-loop': 'error',
    'no-extra-parens': 'error',
    'no-useless-return': 'error',
    'symbol-description': 'error',
    'no-multi-spaces': 'error',
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    'prettier/prettier': 'error',
    'array-bracket-spacing': ['error', 'never']
  },
}