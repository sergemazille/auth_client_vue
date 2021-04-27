module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  transform: {
    '^.+\\.vue$': 'vue-jest',
  },
  coveragePathIgnorePatterns: ['<rootDir>/tests/unit/support/'],
  moduleNameMapper: {
    '@unit(.*)$': '<rootDir>/tests/unit/$1',
    '@fixtures(.*)$': '<rootDir>/fixtures/$1',
  },
};
