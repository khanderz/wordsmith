module.exports = {
  root: true,
  extends: [
    'universe/native',
    'prettier',
    'universe/shared/typescript-analysis',
  ],
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.d.ts', 'tests/**/*'],
      parserOptions: {
        project: './tsconfig.json',
      },
      env: {
        jest: true,
      },
    },
  ],
  rules: {
    '@typescript-eslint/strict-boolean-expressions': 0,
  },
}
