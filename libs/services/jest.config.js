module.exports = {
  coverageDirectory: './../../coverage/libs/services',
  globals: {
    'ts-jest': {
      tsConfig: '<rootDir>/tsconfig.spec.json',
      stringifyContentPathRegex: '\\.(html|svg)$',
      astTransformers: [
        'jest-preset-angular/build/InlineFilesTransformer',
        'jest-preset-angular/build/StripStylesTransformer',
      ],
    },
  },
  name: 'services',
  preset: './../../jest.config.js',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
};
