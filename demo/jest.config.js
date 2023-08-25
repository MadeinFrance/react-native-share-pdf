const {defaults: tsjPreset} = require('ts-jest/presets');

/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  ...tsjPreset,
  preset: 'react-native',
  setupFiles: [require.resolve('./jest.setup.js')],
  transform: {
    '^.+\\.jsx$': 'babel-jest',
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.spec.json',
      },
    ],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};

// module.exports = {
//   preset: 'react-native',
//   setupFiles: [require.resolve('./jest.setup.js')],
//   transform: {
//     '^.+\\.(js|jsx)$': 'babel-jest',
//   },
//   transformIgnorePatterns: ['<rootDir>/node_modules/'],
// };
