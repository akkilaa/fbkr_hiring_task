const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Allow requiring local .svg files as assets
config.resolver.assetExts.push('svg');

module.exports = config;
