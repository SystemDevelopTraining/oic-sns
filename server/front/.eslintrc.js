module.exports = {
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/func-call-spacing': 'error',
    'prefer-const': 'error',
    'no-else-return': 'error',
    semi: ['error', 'always'],
    'no-extra-semi': 'error',
    eqeqeq: 'error',
    'keyword-spacing': [2, { before: false, after: true }],
    'space-infix-ops': 'error',
    'key-spacing': 'error',
    'no-var': 'error',
  },
  plugins: ['vue', '@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/recommended',
    'prettier/@typescript-eslint',
    'prettier',
  ],
  env: {
    browser: true,
    es6: true,
    node: true,
  },
};
