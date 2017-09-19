const path = require('path');

const ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const extractSass = new ExtractTextPlugin({
    filename: "[name].[contenthash].css"
});


module.exports = {
  watch:true,
  entry: './src/js/index.js',
  output: {
    filename: 'bundle.js'
  },
    plugins: [
        new UglifyJSPlugin()
    ],
   module: {
     rules: [
         {
           test: /\.(png|svg|jpg|gif)$/,
           use: [
            'file-loader'
           ]
       },
       {
         test: /\.scss$/,
         use: [{
             loader: "style-loader"
         }, {
             loader: "css-loader", options: { minimize: true }
         }, {
             loader: "sass-loader"
         }]
       }
     ]
   }
  };

