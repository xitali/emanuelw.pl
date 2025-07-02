const path = require('path');

module.exports = {
  entry: './src/client/main.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  output: {
    filename: 'script.js',
    path: path.resolve(__dirname, 'dist/public'),
    clean: true,
  },
  devtool: 'source-map',
  optimization: {
    minimize: true,
  },
};