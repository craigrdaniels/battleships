const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

const env = process.env.NODE_ENV || 'development';
const isDev = env === 'development';
const isProd = env === 'production';

module.exports = {
  target: 'web',
  mode: 'development',
  entry: {
    index: './src/index.js',
  },
  devtool: 'inline-source-map',
  plugins: [
    new ESLintPlugin(),
    new HtmlWebpackPlugin({
      title: 'Battleships',
      templateContent: `
      <html>
      <head><title>Battleships</title>
      <meta name="viewport" content="width=device-width, initial-scale=1"></head>
      <body>
        <div id="content" class="min-h-screen w-screen flex bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-50"></div>
      </body>
    </html>
      `,
    }),
    new MiniCssExtractPlugin()
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/i,
        exclude: /node_modules/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
      },
    ],
  },
};