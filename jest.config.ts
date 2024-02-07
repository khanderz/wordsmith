import type { Config } from 'jest'

const config: Config = {
  // The directory where Jest should store its cached dependency information
  // cacheDirectory: "/private/var/folders/4v/b3hp59tx1vdfkjykrhjs4jlr0000gn/T/jest_dx",
  cacheDirectory: '.jest/cache',

  // Automatically clear mock calls, instances, contexts and results before every test
  clearMocks: true,

  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,

  // The directory where Jest should output its coverage files
  coverageDirectory: 'coverage',

  // A set of global variables that need to be available in all test environments
  // globals: {},
  globals: {
    'ts-jest': {
      babelConfig: true,
      isolatedModules: true,
    },
  },

  // An array of directory names to be searched recursively up from the requiring module's location
  moduleDirectories: [
    'node_modules',
    // add the directory with the test-utils.js file
    '__tests__/test-utils',
  ],

  // An array of file extensions your modules use
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json'],

  // A preset that is used as a base for Jest's configuration
  // preset: 'ts-jest',
  preset: 'react-native',
  rootDir: '/Users/khanhmai/Documents/dictionary',

  // A list of paths to directories that Jest should use to search for files in
  // roots: [
  //   "<rootDir>"
  // ],

  // The paths to modules that run some code to configure or set up the testing environment before each test
  // setupFiles: [],

  // A list of paths to modules that run some code to configure or set up the testing framework before each test
  // setupFilesAfterEnv: [],
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],

  // A list of paths to snapshot serializer modules Jest should use for snapshot testing
  // snapshotSerializers: [],

  // The test environment that will be used for testing
  // testEnvironment: "jest-environment-node",
  // testEnvironment: 'jsdom',

  // A map from regular expressions to paths to transformers
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
    // '^.+\\.(ts|tsx)?$': 'babel-jest',
    '^.+\\.(js|jsx)$': 'babel-jest',
  },

  // An array of regexp pattern strings that are matched against all source file paths, matched files will skip transformation
  transformIgnorePatterns: [
    'node_modules/(?!react-native|@shoutem|react-clone-referenced-element|native-base-shoutem-theme)',
    '/node_modules/(?!my-package)(.*)',
    '/node_modules/(?!(@react-native|react-native)/).*/',
    '<rootDir>/node_modules/(react-clone-referenced-element|@react-native-community|react-navigation|@react-navigation/.*|@unimodules/.*|native-base|react-native-code-push)',
    '/node_modules/(?!@react-native/js-polyfills)',
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)',
    '/node_modules/',
    '\\.pnp\\.[^\\/]+$',
  ],

  // Indicates whether each individual test should be reported during the run
  verbose: true,

  // Whether to use watchman for file crawling
  // watchman: true,
}

export default config
