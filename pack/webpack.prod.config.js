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
const CopyWebpackPlugin         = require('copy-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const zopfli = require('@gfx/zopfli');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


const webpack = require('webpack');
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
              sourceMap: false,
            }
          },
          {
            loader: 'postcss-loader',
            options: { sourceMap: false },
          },
          {
            loader: 'fast-sass-loader',
            options: {
              sourceMap: false,
            }
          },
        ],
      },
    ]
  },
  optimization: {
    minimize: true,
    mangleWasmImports: true,
    removeAvailableModules: true,
    splitChunks: {
			cacheGroups: {
				commons: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendors',
					chunks: 'all'
				}
			}
		},
    minimizer: [
      new TerserPlugin({
        cache: path.resolve(PATHS.cache, 'terser-webpack-plugin'),
        parallel: true,
        sourceMap: false,
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
    new CopyWebpackPlugin([
      {
        from: PATHS.client + "/sitemap.txt",
        to: PATHS.output,
      }
    ]),
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
    }),
    new EnvironmentPlugin({
      // * explicitly setting the node environment variable for clarity
      NODE_ENV: 'production',
    }),
    // new LodashModuleReplacementPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new BundleAnalyzerPlugin(),
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /ja|it/),
    // new CompressionPlugin({
    //   compressionOptions: {
    //     numiterations: 15,
    //   },
    //   algorithm(input, compressionOptions, callback) {
    //     return zopfli.gzip(input, compressionOptions, callback);
    //   },
    // }),
  ],
});