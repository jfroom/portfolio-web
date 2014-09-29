//require('grunt').log.writeln('protractor.js, nconf.sauceuser:' + require('nconf').get("SAUCELABS_USERNAME"))
module.exports = {

  options: {
    //configFile: "node_modules/protractor/referenceConf.js", // Default config file
    keepAlive: true, // If false, the grunt process stops when the test fails.
    verbose:true,
    args: {
      //seleniumAddress: 'http://localhost:4444/wd/hub'
    }
  },

  e2e: {
    configFile: './test/protractor-e2e.conf.js',
    keepAlive: false
  },
  e2e_sauce_sl_chrome_win8: {
    configFile: './test/protractor-e2e-sauce.chrome.win8.conf.js'
  },
  e2e_sauce_sl_chrome_linux: {
    configFile: './test/protractor-e2e-sauce.chrome.linux.conf.js'
  },
  e2e_sauce_sl_firefox_linux: {
    configFile: './test/protractor-e2e-sauce.firefox.linux.conf.js'
  },
  e2e_sauce_sl_safari_ios6_1: {
    configFile: './test/protractor-e2e-sauce.safari.ios6_1.conf.js'
  },
  e2e_sauce_sl_android4: {
    configFile: './test/protractor-e2e-sauce.android4.conf.js'
  },
  e2e_auto: {
    configFile: './test/protractor-e2e.conf.js',
    keepAlive: true
  }

};