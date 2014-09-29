module.exports = require('./protractor-e2e.conf.js');
sauceBrowsers = require('./lib/saucelabs.browser.capabilities.js');
require('lodash').extend(module.exports.config.capabilities, sauceBrowsers.sl_chrome_win8)
//module.exports.capabilities["tunnel-identifier"] = sauceBrowsers.getTunnelId(module.exports.capabilities)
