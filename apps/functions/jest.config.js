module.exports = {
  name: 'functions',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/functions',
  globals: { 'ts-jest': { tsconfig: '<rootDir>/tsconfig.spec.json' } },
  testEnvironment: 'node',
};
