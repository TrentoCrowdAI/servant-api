module.exports = {
  verbose: true,
  globals: {
    __base: __dirname + '/src/'
  },
  collectCoverageFrom: ['src/**/*.js'],
  globalTeardown: './jest/teardown.js'
};
