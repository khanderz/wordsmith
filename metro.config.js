const { getDefaultConfig } = require("expo/metro-config");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);
config.resolver.sourceExts.push("mjs", "cjs");

config.transformer.getTransformOptions = async () => ({
  transform: {
    experimentalImportSupport: true,
  },
});

module.exports = config;
