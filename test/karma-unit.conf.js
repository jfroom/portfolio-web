var shared = require('./karma-shared.conf'),
  grunt = require("grunt"),
  sauceBrowsers = require('./lib/saucelabs.browser.capabilities.js');

module.exports = function(config) {
  shared(config);

  config.files = shared.files.concat([
    //extra testing code
    'bower_components/angular-mocks/angular-mocks.js',

    //test files
    'test/unit/**/*.spec.coffee',

    // fixtures
    {
      pattern: 'test/fixtures/html/*.html', watched: true, included: true, served: true
    }
    ,{pattern: 'test/fixtures/assets/data/*.json', watched: true, included:false, served:true}

  ]);

  if (process.env.isTravisBuild == 'true') {
    grunt.util._.extend(config, {
      browsers: ['Firefox']
    });
  }

  if (process.env.useSauceLabs === 'true'){

    grunt.log.writeln("setting karma sauce labs vars")
    grunt.util._.extend(config, {
      // global config for SauceLabs

      sauceLabs: {
        username: process.env['SAUCE_USERNAME'],
        accessKey: process.env['SAUCE_ACCESS_KEY'],
        startConnect: true,
        testName: 'work site - karma units'
      }

      // define SL browsers
      ,customLaunchers: sauceBrowsers,

      //browsers: ['sl_chrome_linux', 'sl_firefox_linux', 'sl_safari_mac', 'sl_ie11_win', 'sl_ie10_win', 'sl_ie9_win']
      browsers: ['sl_chrome_linux']
    });
  }

};
