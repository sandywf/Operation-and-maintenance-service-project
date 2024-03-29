const webpack = require('webpack')
const cssnano = require('cssnano')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const config = require('../config')
const debug = require('debug')('app:webpack:config')
const path = require('path');
const CleanDist = require('clean-webpack-plugin')

const paths = config.utils_paths;
const __DEV__ = config.globals.__DEV__;
const __PROD__ = config.globals.__PROD__;
const __TEST__ = config.globals.__TEST__;

debug('Creating configuration.')
const webpackConfig = {
  name: 'client',
  target: 'web',
  devtool: config.compiler_devtool,
  resolve: {
    root: paths.client(),
    extensions: ['', '.js', '.jsx', '.json']
  },
  module: {}
}
// ------------------------------------
// Entry Points
// ------------------------------------
const APP_ENTRY = paths.client('main.js')

webpackConfig.entry = {
  app: __DEV__
    ? [APP_ENTRY].concat(`webpack-hot-middleware/client?path=${config.compiler_public_path}__webpack_hmr`)
    : [APP_ENTRY],
  vendor: config.compiler_vendors
}

// ------------------------------------
// Bundle Output
// ------------------------------------
webpackConfig.output = {
  // filename: `[name].[${config.compiler_hash_type}].js`,
  filename: `[name].js`,
  chunkFilename: '[name].js',
  path: paths.dist(),
  publicPath: config.compiler_public_path
}
// publicPath: config.compiler_public_path
// ------------------------------------
// Plugins
// ------------------------------------
var htmlObj;

if(process.env.NODE_ENV === 'production'){
  htmlObj ={
    template: paths.client('index.html'),
    hash: false,
    favicon: paths.client('static/favicon.ico'),
    filename: 'index.html',
    inject: false,
    minify: {
      collapseWhitespace: false
    }
  };  
}else{
  htmlObj ={
    template: paths.client('dev.html'),
    hash: false,
    favicon: paths.client('static/favicon.ico'),
    filename: 'index.html',
    inject: true,
    minify: {
      collapseWhitespace: false
    }
  };  
}
webpackConfig.plugins = [
  new webpack.DefinePlugin(config.globals),
  new HtmlWebpackPlugin(htmlObj),
  new webpack.ProvidePlugin({

        $:"jquery",

        jQuery:"jquery",

        "window.jQuery":"jquery"

      })
]
if (__DEV__) {
  debug('Enable plugins for live development (HMR, NoErrors).')
  webpackConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  )
} else if (__PROD__) {
  debug('Enable plugins for production (OccurenceOrder, Dedupe & UglifyJS).')
  webpackConfig.plugins.push(
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        unused: true,
        dead_code: true,
        warnings: false
      }
    })
  )
}

// Don't split bundles during testing, since we only want import one bundle
if (!__TEST__) {
  webpackConfig.plugins.push(
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor']
    })
  )
}

// ------------------------------------
// Loaders
// ------------------------------------
// JavaScript / JSON
webpackConfig.module.loaders = [{
  test: /\.(js|jsx)$/,
  exclude: /node_modules/,
  loader: 'babel',
  query: config.compiler_babel
}, {
  test: /\.json$/,
  loader: 'json'
}]

// ------------------------------------
// Style Loaders
// ------------------------------------
// We use cssnano with the postcss loader, so we tell
// css-loader not to duplicate minimization.
const BASE_CSS_LOADER = 'css?sourceMap&-minimize'

const cssModulesLoader = [
  BASE_CSS_LOADER,
  'modules',
  'importLoaders=1',
  'localIdentName=[name]__[local]___[hash:base64:5]',
].join('&');

webpackConfig.module.loaders.push({
  test: /\.scss$/,
  exclude: null,
  loaders: [
    'style',
    cssModulesLoader,
    'postcss',
    'sass?sourceMap'
  ]
})
webpackConfig.module.loaders.push({
  test: /\.css$/,
  exclude: null,
  loaders: [
    'style',
    BASE_CSS_LOADER,
    'postcss'
  ]
})

webpackConfig.sassLoader = {
  includePaths: paths.client('styles')
}

webpackConfig.postcss = [
  cssnano({
    autoprefixer: {
      add: true,
      remove: true,
      browsers: ['last 2 versions']
    },
    discardComments: {
      removeAll: true
    },
    discardUnused: false,
    mergeIdents: false,
    reduceIdents: false,
    safe: true,
    sourcemap: true
  })
]
// 清除哈希打包文件
var cleanpath = path.resolve(__dirname,'../dist/');
webpackConfig.plugins.push(
  new CleanDist(cleanpath)
)
// File loaders
/* eslint-disable */
webpackConfig.module.loaders.push(
  { test: /\.woff(\?.*)?$/,  loader: 'url?prefix=fonts/&name=[name].[ext]&limit=10000&mimetype=application/font-woff&publicPath=./' },
  { test: /\.woff2(\?.*)?$/, loader: 'url?prefix=fonts/&name=[name].[ext]&limit=10000&mimetype=application/font-woff2&publicPath=./' },
  { test: /\.otf(\?.*)?$/,   loader: 'file?prefix=fonts/&name=[name].[ext]&limit=10000&mimetype=font/opentype&publicPath=./' },
  { test: /\.ttf(\?.*)?$/,   loader: 'url?prefix=fonts/&name=[name].[ext]&limit=10000&mimetype=application/octet-stream&publicPath=./' },
  { test: /\.eot(\?.*)?$/,   loader: 'file?prefix=fonts/&name=[name].[ext]&publicPath=./' },
  { test: /\.svg(\?.*)?$/,   loader: 'url?prefix=fonts/&name=[name].[ext]&limit=10000&mimetype=image/svg+xml&publicPath=./' },
  { test: /\.(png|jpg|gif)$/,loader: 'url?name=[name].[ext]&limit=8192&publicPath=./' }
)
/* eslint-enable */

// ------------------------------------
// Finalize Configuration
// ------------------------------------
// when we don't know the public path (we know it only when HMR is enabled [in development]) we
// need to use the extractTextPlugin to fix this issue:
// http://stackoverflow.com/questions/34133808/webpack-ots-parsing-error-loading-fonts/34133809#34133809
if (!__DEV__) {
  debug('Apply ExtractTextPlugin to CSS loaders.')
  webpackConfig.module.loaders.filter((loader) =>
    loader.loaders && loader.loaders.find((name) => /css/.test(name.split('?')[0]))
  ).forEach((loader) => {
    const first = loader.loaders[0]
    const rest = loader.loaders.slice(1)
    loader.loader = ExtractTextPlugin.extract(first, rest.join('!'))
    delete loader.loaders
  })

  webpackConfig.plugins.push(
    new ExtractTextPlugin('[name].css', {
      allChunks: true
    })
  )
}
module.exports = webpackConfig
