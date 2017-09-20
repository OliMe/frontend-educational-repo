const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const extractSass = new ExtractTextPlugin({
    filename: "[name].[contenthash].css"
});

module.exports = {
  watch:true,
  entry: [
      './src/js/vendor.min.js',
      './src/js/lib/zepto.min.js',
      './src/js/lib/underscore-min.js',
      './src/js/lib/backbone-min.js',
      './src/js/lib/backbonelocalStorage-min.js',
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
               loader: 'babel-loader',
               query: {
                   presets: ['es2015']
               }
           }
     ]
   },
   plugins: [
       new UglifyJSPlugin(),
       new ExtractTextPlugin({ // define where to save the file
           filename: 'bundle.css'
       }),
       new OptimizeCssAssetsPlugin({
           assetNameRegExp: /\.css$/,
           cssProcessorOptions: { discardComments: { removeAll: true } }
       })
   ]

  };

