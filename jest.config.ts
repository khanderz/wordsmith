import type { Config } from 'jest'

const config: Config = {
  //   testEnvironment: 'jsdom',

  //   testEnvironment: 'node',

  preset: 'jest-expo',
  //   preset: 'ts-jest',
  //   preset: 'ts-jest/presets/js-with-ts',

  moduleFileExtensions: ['js', 'ts', 'tsx', 'jsx'],

  roots: ['<rootDir>'],
  testMatch: [
    '**/__tests__/**/*.+(ts|tsx|js)',
    '**/?(*.)+(spec|test).+(ts|tsx|js)',
  ],
  //   transform: {
  //     '^.+\\.(j|t)sx?$': 'ts-jest',
  //     // '^.+\\.[t|j]sx?$': 'babel-jest',
  //   },
  //   transformIgnorePatterns: [
  //     'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)',
  //     'node_modules/(?!(jest-)?react-native|react-clone-referenced-element|@react-native-community|expo(nent)?|@expo(nent)?/.*|react-navigation|@react-navigation/.*|@unimodules/.*|sentry-expo|native-base)',
  //     '\\.(css|scss|sass)$',
  //     'node_modules/(?!variables/.*)',
  //     'node_modules/(?!react-navigation/.*)',
  //     'node_modules/(?!@react-native/js-polyfills/.*)',
  //   ],

  moduleNameMapper: {
    '\\.(css|scss|sass)$': 'identity-obj-proxy',
  },

  displayName: 'client',
}

export default config
