process.env.NODE_PATH = process.env.NODE_PATH || './node_modules';
process.env.NODE_PATH += ":./app/js";

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', 'browserify'],

    files: [
      'spec/**/*.js'
    ],

    exclude: [
    ],

    preprocessors: {
      'spec/**/*.js': [ 'browserify' ]
    },

    reporters: ['progress'],

    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['PhantomJS'],
    singleRun: false,

    browserify: {
      debug: true,
      transform: []
    },
  });
};
