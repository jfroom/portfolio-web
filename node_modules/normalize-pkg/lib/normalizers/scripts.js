'use strict';

var utils = require('../utils');

module.exports = function(val, key, config, schema) {
  if (utils.isObject(val) && utils.isString(val.test) && /mocha -R \w+$/.test(val.test)) {
    val.test = 'mocha';
  }
  return val;
};
