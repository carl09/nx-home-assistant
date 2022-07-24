module.exports = {
  name: 'google-local',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/google-local',
  globals: { 'ts-jest': { tsconfig: '<rootDir>/tsconfig.spec.json' } },
  testEnvironment: 'node',
};
