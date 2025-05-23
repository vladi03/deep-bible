export default {
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  transformIgnorePatterns: [
    '/node_modules/(?!rmwc|@material|@rmwc).+\\.js$'
  ],
  testEnvironment: 'jsdom',
};
