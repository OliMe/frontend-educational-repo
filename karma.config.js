var webpackConfig = require('./webpack.config.js');

module.exports = function (config) {
    config.set({
        basePath: process.cwd() + '/',
        frameworks: ['jasmine-jquery','jasmine'],

        reporters: ['mocha'],
        port: 9876,
        colors: false,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['PhantomJS'],
        singleRun: false,
        hostname: 'localhost',
        retryLimit:0,
        autoWatchBatchDelay: 300,


        files: [
            './tests/*.js',
            {pattern: process.cwd() + '/tests/fixtures/*.html', included: false, served: true},
        ],

        webpack: webpackConfig,

        webpackMiddleware: {
            stats: 'errors-only'
        },
        preprocessors: {
            './tests/*.js': ['webpack'],
        },

    });
}