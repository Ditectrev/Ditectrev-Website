module.exports = {
  coverageDirectory: './../../coverage/libs/faq',
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
  name: 'faq',
  preset: './../../jest.config.js',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
};
