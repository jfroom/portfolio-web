module.exports = require('./protractor-e2e.conf.js');
sauceBrowsers = require('./lib/saucelabs.browser.capabilities.js');
require('lodash').extend(module.exports.config.capabilities, sauceBrowsers.sl_safari_ios6_1)
//module.exports.capabilities["tunnel-identifier"] = sauceBrowsers.getTunnelId(module.exports.capabilities)