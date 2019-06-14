const prettier = require('./.prettierrc');

module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: 'gulp',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    'space-before-function-paren': 0,
    'max-len': ['error', { code: prettier.printWidth, ignoreUrls: true }], // KEEP THIS IN SYNC,
    'no-unused-vars': ["error", { "argsIgnorePattern": "^_" }],
  },
  overrides: [
    {
      plugins: ['jest'],
      env: {
        jest: true,
        node: true,
      },
      files: ['__jest__/*.js', '**/*.test.js', '**/*.spec.js'],
      settings: {
        'import/resolver': {
          jest: {
            jestConfigFile: './jest.config.js',
          },
        },
      },
    },
  ],
};
