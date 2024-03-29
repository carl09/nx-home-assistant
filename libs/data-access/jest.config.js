module.exports = {
  name: 'data-access',
  preset: '../../jest.config.js',
  transform: {
    '^.+\\.[tj]sx?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'html'],
  coverageDirectory: '../../coverage/libs/data-access',
  globals: { 'ts-jest': { tsconfig: '<rootDir>/tsconfig.spec.json' } },
};
