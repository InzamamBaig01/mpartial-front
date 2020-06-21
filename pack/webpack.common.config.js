const CopyWebpackPlugin = require('copy-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');

const {
  NamedModulesPlugin
} = require('webpack');

const {
  GENERAL,
  PATHS,
} = require('../settings');

module.exports = {
  entry: { app: PATHS.entry },
  resolve: {
    alias: {
      app: PATHS.app,
      assets: PATHS.assets,
      settings: PATHS.settings,
      styles: PATHS.styles,
      utils: PATHS.utils,
      pages: PATHS.pages,
      components: PATHS.components,
      contexts: PATHS.contexts,
    },
    extensions: ['.ts', '.tsx', '.js', '.css'],
  },
  module: {
    rules: [
      {
        test: /\.[tj]sx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      }, {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        include: /node_modules/,
        loaders: ['style-loader', 'css-loader'],
      },
      {
        test: /\.svg$/,
        exclude: /node_modules/,
        use: {
          loader: 'svg-url-loader',
          options: {
            limit: 8192,
            stripdeclarations: true,
            iesafe: true,
            encoding: 'base64',
          },
        },
      },
      {
        test: /\.(png|gif|jpg|cur)$/,
        loader: 'url-loader',
        options: {
          iesafe: true,
          // encoding: 'base64',
        }
      },
      {
        test: /\.(mp4)$/,
        use: 'file-loader?name=static/[name].[ext]',
      },
      {
        test: /\.woff2(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader',
        query: {
          limit: 10000,
          mimetype: 'application/font-woff2',
          publicPath: '/',
        },
      },
      {
        test: /\.woff(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader',
        query: {
          limit: 10000,
          mimetype: 'application/font-woff',
          publicPath: '/',
        },
      },
      {
        test: /\.(ttf|eot|otf)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader',
        query: {
          publicPath: '/',
        },
      },
    ],
  },
  plugins: [
    new NamedModulesPlugin(),
    new HTMLWebpackPlugin({
      filename: PATHS.index.output,
      template: PATHS.index.input
    }),
    new CopyWebpackPlugin([
      {
        context: PATHS.assets,
        from: '**/*',
        to: 'assets/',
      }
    ]),
  ],
  target: 'web',
  output: {
    path: PATHS.static,
    filename: '[name].[hash].js',
    publicPath: '/static/',
  }
};