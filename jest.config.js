module.exports = {
  // roots: ['<rootDir>'],

  collectCoverage: true,
  coverageDirectory: '../coverage',
  coverageReporters: ['text-summary', 'lcov'],
  // coverageProvider: 'v8',
  collectCoverageFrom: [
    '<rootDir>/src/modules/**/*.service.ts',
    '<rootDir>/src/modules/**/*.repository.ts',
    '<rootDir>/src/modules/**/pipes/*.ts',
    '<rootDir>/src/modules/**/guards/*.ts',
    '<rootDir>/src/shared/**/guards/*.ts',
    '<rootDir>/src/shared/**/guards/*.ts',
    '<rootDir>/src/shared/**/guards/*.ts',
    '<rootDir>/src/shared/**/guards/*.ts'
  ],

  coveragePathIgnorePatterns: [
    '"<rootDir>/src/config/*',
    '"<rootDir>/src/app.modules.ts',

    '"<rootDir>/src/shared/filters/*',
    '"<rootDir>/src/shared/interceptors/*',
    '"<rootDir>/src/shared/providers/**/*.ts',
    '"<rootDir>/src/shared/**/decorators/*',
    '"<rootDir>/src/shared/**/guards/*',
    '"<rootDir>/src/shared/**/models/*',
    '"<rootDir>/src/shared/**/*.module.ts',
    '"<rootDir>/src/shared/**/*.controller.ts',

    '"<rootDir>/src/shared/modules/filters/*',
    '"<rootDir>/src/shared/modules/interceptors/*',
    '"<rootDir>/src/shared/modules/**/providers/**/*.ts',
    '"<rootDir>/src/shared/modules/**/decorators/*',
    '"<rootDir>/src/shared/modules/**/guards/*',
    '"<rootDir>/src/shared/modules/**/models/*',
    '"<rootDir>/src/shared/modules/**/*.module.ts',
    '"<rootDir>/src/shared/modules/**/*.controller.ts',

    '"<rootDir>/src/modules/filters/*',
    '"<rootDir>/src/modules/interceptors/*',
    '"<rootDir>/src/modules/**/providers/**/*.ts',
    '"<rootDir>/src/modules/**/decorators/*',
    '"<rootDir>/src/modules/**/guards/*',
    '"<rootDir>/src/modules/**/models/*',
    '"<rootDir>/src/modules/**/*.module.ts',
    '"<rootDir>/src/modules/**/*.controller.ts'
  ],

  testEnvironment: 'node',
  rootDir: '__tests__',
  clearMocks: true,
  moduleFileExtensions: ['js', 'json', 'ts'],
  preset: 'ts-jest',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest'
  }
}
