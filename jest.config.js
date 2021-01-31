module.exports = {
  roots: ['<rootDir>'],

  collectCoverage: true,
  coverageDirectory: '../coverage',
  coverageReporters: ['text-summary', 'lcov'],
  coverageProvider: 'v8',
  collectCoverageFrom: ['<rootDir>/src/modules/**/*.service.ts'],

  coveragePathIgnorePatterns: [
    'node_modules',
    'src/config/*',
    'src/app.modules.ts',
    'src/shared/filters/*',
    'src/shared/interceptors/*',
    'src/modules/**/dtos/*',
    'src/modules/**/entities/*',
    'src/modules/**/enums/*',
    'src/modules/**/decorators/*',
    'src/modules/**/models/*',
    'src/modules/**/*.module.ts$',
    'shared/modules/**/*.module.ts$'
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
