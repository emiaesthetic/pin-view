const path = require('path');

module.exports = function override(config) {
  config.resolve.alias = {
    ...config.resolve.alias,
    '@': path.resolve(__dirname, 'src'),
    '@components': path.resolve(__dirname, 'src/components'),
    '@pages': path.resolve(__dirname, 'src/pages'),
    '@layouts': path.resolve(__dirname, 'src/layouts'),
    '@hooks': path.resolve(__dirname, 'src/hooks'),
    '@services': path.resolve(__dirname, 'src/services'),
    '@store': path.resolve(__dirname, 'src/store'),
    '@utils': path.resolve(__dirname, 'src/utils'),
  };
  return config;
};
