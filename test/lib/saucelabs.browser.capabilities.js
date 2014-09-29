module.exports = {
  sl_chrome_linux: {
    base: 'SauceLabs',
    browserName: 'chrome',
    platform: 'linux'
  },
  sl_chrome_win8: {
    base: 'SauceLabs',
    browserName: 'chrome',
    platform: 'Windows 8'
  },
  sl_firefox_linux: {
    base: 'SauceLabs',
    browserName: 'firefox',
    platform: 'linux'
  },
  sl_firefox_win8: {
    base: 'SauceLabs',
    browserName: 'firefox',
    platform: 'Windows 8'
  },
  sl_opera_linux: {
    base: 'SauceLabs',
    browserName: 'opera',
    platform: 'linux'
  }
  ,sl_safari_mac: {
    base: 'SauceLabs',
    browserName: 'safari',
    platform: 'OS X 10.8'
  },
  sl_ie11_win8_1: {
    base: 'SauceLabs',
    browserName: 'internet explorer',
    platform: 'WIN8.1',
    version: '11'

  },
  sl_ie10_win8: {
    base: 'SauceLabs',
    browserName: 'internet explorer',
    platform: 'Windows 8',
    version: '10'
  },
  sl_ie9_win7: {
    base: 'SauceLabs',
    browserName: 'internet explorer',
    platform: 'Windows 7',
    version: '9'
  },
  sl_safari_ios6_1: {
    base: 'SauceLabs',
    browserName: 'iphone',
    platform: 'OS X 10.8',
    version: '6.1',
    deviceOrientation: 'portrait'
  },
  sl_android4: {
    base: 'SauceLabs',
    browserName: 'android',
    platform: 'Linux',
    version: '4.0',
    deviceOrientation: 'portrait'
  },
  sl_android_linux: {
    base: 'SauceLabs',
    browserName: 'android',
    platform: 'linux',
    'device-orientation': 'portrait'
  },
  apm_safari_ios:{
    app:'safari',
    browserName:'',
    device:'ios',
    version:'7.0',
    newCommandTimeout:'60',
    launch:'true',
    launchTimeout:'20000'
  },

  getTunnelId: function (caps) {
    console.log("caps:" + caps)
    return caps['browserName'] + "-" + caps['version'] + caps['platform'] + require("lodash").random(true)
  }
}