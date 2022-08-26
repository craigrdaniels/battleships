module.exports = {
  env: {
    jest: true,
    browser: true,
    es2021: true,
  },
  plugins: ['jest', 'eslint-comments'],
  extends: ['airbnb-base', 'plugin:jest/recommended', 'prettier'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'no-console': ['error', { allow: ['warn', 'error'] }],
  },
};
