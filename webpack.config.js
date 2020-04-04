const path = require('path');

module.exports = {
  mode: 'development',
  entry: './frontend/index.js',
  output: {
    path: path.resolve(__dirname, 'public/js'),
    filename: 'main.bundle.js'
  }
};