module.exports = {
  roots: ['<rootDir>'],

  collectCoverage: true,
  coverageDirectory: '../coverage',
  coverageReporters: ['text-summary', 'lcov'],
  coverageProvider: 'v8',
  collectCoverageFrom: [
    '<rootDir>/src/modules/**/*.service.ts',
    '<rootDir>/src/modules/**/*.repository.ts',
    '<rootDir>/src/modules/**/pipes/*.ts',
    '<rootDir>/src/modules/**/guards/*.ts'
  ],

  coveragePathIgnorePatterns: [
    'node_modules',
    'src/config/*',
    'src/app.modules.ts',

    'src/shared/filters/*',
    'src/shared/interceptors/*',
    'src/shared/providers/**/*.ts$',
    'src/shared/**/decorators/*',
    'src/shared/**/guards/*',
    'src/shared/**/models/*',
    'src/shared/**/*.module.ts$',
    'src/shared/**/*.controller.ts$',

    'src/shared/modules/filters/*',
    'src/shared/modules/interceptors/*',
    'src/shared/modules/**/providers/**/*.ts$',
    'src/shared/modules/**/decorators/*',
    'src/shared/modules/**/guards/*',
    'src/shared/modules/**/models/*',
    'src/shared/modules/**/*.module.ts$',
    'src/shared/modules/**/*.controller.ts$',

    'src/modules/filters/*',
    'src/modules/interceptors/*',
    'src/modules/**/providers/**/*.ts$',
    'src/modules/**/decorators/*',
    'src/modules/**/guards/*',
    'src/modules/**/models/*',
    'src/modules/**/*.module.ts$',
    'src/modules/**/*.controller.ts$'
  ],

  testEnvironment: 'node',
  rootDir: 'tests',
  clearMocks: true,
  moduleFileExtensions: ['js', 'json', 'ts'],
  preset: 'ts-jest',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest'
  }
}
