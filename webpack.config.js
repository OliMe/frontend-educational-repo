const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

var webpack = require('webpack');


module.exports = {
  watch:true,
  entry: [
      './src/js/index.js',
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
         {
             test: /\.(sass|scss)$/,
             loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader'])
         }
     ],
     loaders: [
           {
               test: /\.js$/,
               loader: 'babel-loader',
               exclude: /node_modules/
           },
             {
                 test: /\.jsx?$/,
                 loader: 'babel-loader',
                 exclude: /node_modules/
             }
     ]
   },
    resolve: {
        modules: [path.resolve(__dirname, 'src'), 'node_modules']
    },
   plugins: [

       //new UglifyJSPlugin(),

       new ExtractTextPlugin({ // define where to save the file
           filename: 'bundle.css'
       }),

        /*
       new OptimizeCssAssetsPlugin({
           assetNameRegExp: /\.css$/,
           cssProcessorOptions: { discardComments: { removeAll: true } }
       }),
       */

        /*
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'vendor-min.js'
        })
        */  

   ]

  };

