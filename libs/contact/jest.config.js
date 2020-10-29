module.exports = {
  coverageDirectory: './../../coverage/libs/contact',
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
  name: 'contact',
  preset: './../../jest.config.js',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
};
