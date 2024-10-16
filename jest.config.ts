import type { Config } from 'jest'

const config: Config = {
  preset: 'jest-expo',
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  transformIgnorePatterns: [],

  moduleFileExtensions: ['js', 'ts', 'tsx', 'jsx'],

  roots: ['<rootDir>'],
  testMatch: [
    '**/__tests__/**/*.+(ts|tsx|js)',
    '**/?(*.)+(spec|test).+(ts|tsx|js)',
  ],

  moduleNameMapper: {
    '\\.(css|scss|sass)$': 'identity-obj-proxy',
  },

  setupFiles: ['<rootDir>/.jest/setEnvVars.js'],
  verbose: true,
  resetMocks: false,
  moduleDirectories: ['node_modules', __dirname],
}

export default config
