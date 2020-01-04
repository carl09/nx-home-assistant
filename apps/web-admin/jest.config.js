module.exports = {
  name: 'web-admin',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/web-admin',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
