module.exports = function (api) {
  api.cache(true)

  const presets = ['babel-preset-expo']

  return {
    presets,
    // plugins: ['@babel/plugin-transform-class-static-block'],
  }
}

// module.exports = function (api) {
//   api.cache(true)
//   return {
//     presets: [
//       ['@babel/preset-env', { targets: { node: 'current' } }],
//       [
//         '@babel/preset-react',
//         {
//           runtime: 'automatic',
//         },
//       ],
//       [
//         'babel-preset-expo',
//         {
//           jsxRuntime: 'automatic',
//           disableImportExportTransform: true,
//           // jsxImportSource: 'react',
//         },
//       ],
//       ['@babel/preset-typescript', { allowNamespaces: true }],
//     ],
//     plugins: [
//       'react-native-paper/babel',
//       '@babel/plugin-proposal-export-namespace-from',
//       'react-native-reanimated/plugin',
//       '@babel/plugin-transform-react-jsx',
//       '@babel/plugin-transform-flow-strip-types',
//     ],
//     env: {
//       test: {
//         plugins: ['@babel/plugin-transform-runtime'],
//       },
//       production: {
//         plugins: [
//           'react-native-paper/babel',
//           '@babel/plugin-proposal-export-namespace-from',
//           'react-native-reanimated/plugin',
//           '@babel/plugin-transform-react-jsx',
//         ],
//       },
//     },
//   }
// }
