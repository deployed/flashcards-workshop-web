/**
 * @type {import('prettier').Config}
 * @see https://prettier.io/docs/en/configuration.html
 */
const config = {
  semi: true,
  singleQuote: true,
  trailingComma: 'all',
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  plugins: ['@trivago/prettier-plugin-sort-imports'],
  importOrder: ['^react$', '<THIRD_PARTY_MODULES>', '^@/(.*)$', '^../(.*)$', '^./(.*)$'],
  importOrderSeparation: true,
};

export default config;
