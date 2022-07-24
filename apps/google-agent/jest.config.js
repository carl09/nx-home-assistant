module.exports = {
  name: 'google-agent',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/google-agent',
  globals: { 'ts-jest': { tsconfig: '<rootDir>/tsconfig.spec.json' } },
  testEnvironment: 'node',
};
