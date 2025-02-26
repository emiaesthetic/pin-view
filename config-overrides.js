const path = require('path');

module.exports = function override(config) {
  config.resolve.alias = {
    ...config.resolve.alias,
    '@': path.resolve(__dirname, 'src'),
    '@components': path.resolve(__dirname, 'src/components'),
    '@config': path.resolve(__dirname, 'src/config'),
    '@context': path.resolve(__dirname, 'src/context'),
    '@hooks': path.resolve(__dirname, 'src/hooks'),
    '@layouts': path.resolve(__dirname, 'src/layouts'),
    '@pages': path.resolve(__dirname, 'src/pages'),
    '@services': path.resolve(__dirname, 'src/services'),
    '@store': path.resolve(__dirname, 'src/store'),
    '@styles': path.resolve(__dirname, 'src/styles'),
    '@utils': path.resolve(__dirname, 'src/utils'),
  };
  return config;
};
