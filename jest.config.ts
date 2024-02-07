import type { Config } from 'jest'

const config: Config = {
  preset: 'jest-expo',

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
}

export default config
