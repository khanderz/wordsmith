module.exports = function (api) {
  api.cache(true)
  const disableImportExportTransform = true
  return {
    presets: [
      [
        'babel-preset-expo',
        {
          native: {
            disableImportExportTransform,
          },
          web: {
            disableImportExportTransform,
          },
        },
      ],
    ],
    plugins: [
      'react-native-paper/babel',
      '@babel/plugin-proposal-export-namespace-from',
      // 'react-native-reanimated/plugin',
    ],
    env: {
      production: {
        plugins: [
          'react-native-paper/babel',
          '@babel/plugin-proposal-export-namespace-from',
          // 'react-native-reanimated/plugin',
        ],
      },
    },
  }
}
