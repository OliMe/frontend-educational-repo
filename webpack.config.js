const path = require('path');

const ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const extractSass = new ExtractTextPlugin({
    filename: "[name].[contenthash].css"
});


module.exports = {
  watch:true,
  entry: ['./src/js/index.js', './src/scss/main.scss'],
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
         { // sass / scss loader for webpack
             test: /\.(sass|scss)$/,
             loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader'])
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

