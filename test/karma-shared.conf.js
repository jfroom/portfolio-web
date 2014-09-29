//lodash
__ = require('../bower_components/lodash/dist/lodash.min');

var shared = function(config) {
  config.set({

    // base path, that will be used to resolve files and exclude
    basePath: '../',

    frameworks: ['jasmine'],

    // use dots reporter, as travis terminal does not support escaping sequences
    // possible values: 'dots' || 'progress'
    reporters: ['progress'],//, 'coverage'],

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari
    // - PhantomJS
    browsers: ['Chrome'],
    //browsers: ['Chrome', 'ChromeCanary', 'Firefox', 'Opera', 'Safari', 'PhantomJS'],
    autoWatch: true,

    // these are default values anyway
    singleRun: false,
    colors: true
    ,preprocessors:{
      '**/*.coffee': 'coffee',
      '**/*.html': 'html2js'//[]
      //,'../.tmp/scripts/**/*.js': 'coverage'
    }
    ,coffeePreprocessor: {
      options: { sourceMap: true }
      // transforming the filenames
      ,transformPath: function ( path ) { return path.replace( /.js$/, '.coffee' ); }
    },
    // optionally, configure the reporter
    coverageReporter: {
      type : 'html',
      dir : 'coverage/'
    }
  });
};

shared.files = [

  //3rd Party Code
  'bower_components/jquery/jquery.min.js',
  'bower_components/angular/angular.js',
  'bower_components/jasmine-jquery/lib/jasmine-jquery.js',
  'bower_components/fastclick/lib/fastclick.js',
  'bower_components/angular-route/angular-route.min.js',
  'bower_components/angular-resource/angular-resource.min.js',
  'bower_components/angular-sanitize/angular-sanitize.min.js',
  'bower_components/showdown/compressed/showdown.js',
  'bower_components/lodash/dist/lodash.min.js',
  'bower_components/log4javascript/log4javascript.js',
  'bower_components/moment/moment.js',
  'bower_components/angular-moment/angular-moment.js',

  'app/scripts/vendor/bootstrap-scrollspy.2.3.js',
  'app/scripts/vendor/modernizr.2.6.2.custom.js',


  'test/lib/MouseBot.coffee',
  'test/lib/karma.shared.coffee',


  //App-specific Code
  'app/scripts/plugins/**/*.coffee',
  'app/scripts/common/**/*.coffee',
  'app/scripts/app/**/*.coffee',

  //fixtures
  {pattern: 'app/assets/data/*.json', included:false , served: true},
  {pattern: 'test/fixtures/assets/data/*.json', included:false , served: true}

];

module.exports = shared;
