module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: '../tsconfig.client.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  extends: [
    '../.eslintrc.js'
  ],
  root: true,
  env: {
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
};
