module.exports = function (api) {
  api.cache(true)
  return {
    presets: [
      ['@babel/preset-env', { targets: { node: 'current' } }],
      '@babel/preset-typescript',
      'module:metro-react-native-babel-preset',
    ],
    plugins: [
      'react-native-paper/babel',
      '@babel/plugin-proposal-export-namespace-from',
      'react-native-reanimated/plugin',
      '@babel/plugin-transform-react-jsx',
      '@babel/plugin-transform-flow-strip-types',
    ],
    // env: {
    //   production: {
    //     plugins: [
    //       'react-native-paper/babel',
    //       '@babel/plugin-proposal-export-namespace-from',
    //       'react-native-reanimated/plugin',
    //       '@babel/plugin-transform-react-jsx',
    //     ],
    //   },
    // },
  }
}
