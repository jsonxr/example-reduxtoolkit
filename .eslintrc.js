module.exports = {
  root: true,
  extends: ['@react-native-community', 'prettier'],
  plugins: ['prettier', '@typescript-eslint'],
  rules: {
    'prettier/prettier': 'warn',
    'no-console': 'warn',
    'react-hooks/exhaustive-deps': 'warn',
    '@typescript-eslint/no-unused-vars': 'warn',
  },
}
