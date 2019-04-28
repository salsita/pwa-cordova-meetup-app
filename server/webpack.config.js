const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: './src/index.ts',
  externals: [nodeExternals()],
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'server.js'
  },
  mode: process.env.NODE_ENV === 'development' ? 'development' : 'production',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'awesome-typescript-loader',
            options: {
              configFileName: './tsconfig.json'
            }
          }
        ],
      }
    ],
  },
  resolve: {
    extensions: ['.ts', '.js', '.json'],
    alias: {
      '@models': path.resolve(__dirname, '../models'),
      config: path.resolve(__dirname, 'src/config'),
      helpers: path.resolve(__dirname, 'src/helpers'),
      locale: path.resolve(__dirname, 'src/locale'),
      models: path.resolve(__dirname, 'src/models'),
      services: path.resolve(__dirname, 'src/services'),
    },
  },
  target: 'node'
};
