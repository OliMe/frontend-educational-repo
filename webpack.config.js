const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const extractSass = new ExtractTextPlugin({
    filename: "[name].[contenthash].css"
});

var webpack = require('webpack');

module.exports = {
  watch:true,
  entry: [

      './src/js/lib/zepto.min.js',
      './src/js/lib/underscore-min.js',
      './src/js/lib/backbone-min.js',
      './src/js/lib/backbonelocalStorage-min.js',
      './src/js/index.js',
      './src/scss/main.scss',
      './src/js/note_router.js',
      './src/js/note_model.js',
      './src/js/views/note_index.js',
      './src/js/views/note_new.js',
      './src/js/views/note_edit.js',
      './src/js/helpers.js'
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build')
  },
   module: {
     rules: [
         {
           test: /\.(png|svg|jpg|gif)$/,
           use: [
            'file-loader'
           ]
         },
         {
             test: /\.css$/,
             use: ExtractTextPlugin.extract({
                 fallback: "style-loader",
                 use: "css-loader"
             })
         },
         { // sass / scss loader for webpack
             test: /\.(sass|scss)$/,
             loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader'])
         }
     ],
     loaders: [
           {
               test: /\.js$/,
               loader: 'babel-loader'
           }
     ]
   },
    resolve: {
        modules: [path.resolve(__dirname, 'src'), 'node_modules']
    },
   plugins: [
       new UglifyJSPlugin(),
       new ExtractTextPlugin({ // define where to save the file
           filename: 'bundle.css'
       }),
       new OptimizeCssAssetsPlugin({
           assetNameRegExp: /\.css$/,
           cssProcessorOptions: { discardComments: { removeAll: true } }
       }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'vendor-min.js'
        })
   ]

  };

