//require("grunt").log.writeln("__path:" + __dirname + " __filename:" + __filename)
var grunt = require("grunt"),
  shared = require('./protractor-shared.conf'),
  sauceBrowsers = require('./lib/saucelabs.browser.capabilities.js');

exports.config = shared(module.exports.config);
//grunt.util._.extend(exports.config, shared(exports.config));

fileArr = [
  './e2e/app/app.spec.coffee'
  ,'./e2e/app/app.nav.spec.coffee'
  ,'./e2e/app/work/work.spec.coffee'
  ,'./e2e/app/work/work.nav.spec.coffee'
  ,'./e2e/app/work/work.projects.spec.coffee'
]
exports.config.specs = grunt.util._.union(exports.config.specs, fileArr)

grunt.util._.extend(exports.config, {
  capabilities: {
    'name': 'work site - protractor e2e',
    'build': process.env["BUILD"]
    //'record-video': false,
    //,'phantomjs.binary.path':'./node_modules/phantomjs/lib/phantom/bin/phantomjs'
  }
});

grunt.log.writeln("process.env.useSauceLabs:" + process.env.useSauceLabs)
if (process.env.useSauceLabs === 'true'){
  grunt.util._.extend(exports.config, {
    seleniumAddress:null,
    sauceUser: process.env["SAUCE_USERNAME"],
    sauceKey: process.env["SAUCE_ACCESS_KEY"],
    useSauceConnectLauncher: false,
    sauceConnectLauncherOptions: {
      verbose: false
    }
  });

}else{
  //local testing
  //exports.config.capabilities.browserName = sauceBrowsers.sl_firefox_linux.browserName;
  exports.config.capabilities.browserName = "chrome"

  //exports.config.seleniumAddress = "http://localhost:4445/wd/hub";
  //grunt.util._.extend(exports.config.capabilities, sauceBrowsers.apm_safari_ios);

  //following only needed if phantom is NOT installed globally
  exports.config.capabilities['phantomjs.binary.path'] = './node_modules/phantomjs/bin/phantomjs';
}

grunt.log.writeln("exports.config.seleniumAddress: " + exports.config.seleniumAddress + " sauceuser:" + exports.config.sauceUser);
