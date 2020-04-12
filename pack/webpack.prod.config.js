const CleanWebpackPlugin      = require('clean-webpack-plugin');
const ExtractTextPlugin       = require('extract-text-webpack-plugin');
const MiniCssExtractPlugin    = require('mini-css-extract-plugin');
const StyleLintPlugin         = require('stylelint-webpack-plugin');
const HtmlWebpackPlugin       = require('html-webpack-plugin');
const UglifyJsPlugin          = require('uglifyjs-webpack-plugin');
const TerserPlugin            = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const merge                   = require('webpack-merge');
const common                  = require('./webpack.common.config');
const path                    = require('path');
const CopyPlugin = require('copy-webpack-plugin');

const {
  EnvironmentPlugin,
} = require('webpack');

const {
  GENERAL,
  PATHS,
} = require('../settings');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(css|s[ac]ss)$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              localIdentName: '[local]',
              modules: true,
              sourceMap: true,
            }
          },
          {
            loader: 'postcss-loader',
            options: { sourceMap: true },
          },
          {
            loader: 'fast-sass-loader',
            options: {
              sourceMap: true,
            }
          },
        ],
      },
    ]
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        cache: path.resolve(PATHS.cache, 'terser-webpack-plugin'),
        parallel: true,
        sourceMap: true,
      }),
      new OptimizeCSSAssetsPlugin({}),
    ]
  },
  plugins: [
    new CleanWebpackPlugin([PATHS.static], {
      root: PATHS.output,
      dry: true,
      cleanOnceBeforeBuildPatterns: ['**/*', '!./static/*'],
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
    }),
    new EnvironmentPlugin({
      // * explicitly setting the node environment variable for clarity
      NODE_ENV: 'production',
    }),
  ],
});