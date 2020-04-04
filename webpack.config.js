const path = require('path');

module.exports = {
  mode: 'development',
  entry: './frontend/index.jsx',
  output: {
    path: path.resolve(__dirname, 'public/js'),
    filename: 'main.bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use:  "babel-loader"
      }
    ]
  }
};