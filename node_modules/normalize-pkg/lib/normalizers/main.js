'use strict';

var utils = require('../utils');

module.exports = function(val, key, config, schema) {
  if (typeof val === 'undefined') {
    val = 'index.js';
  }

  if (!utils.exists(val)) {
    delete config[key];
    return;
  }

  schema.update('files', config);
  schema.union('files', config, val);
  return val;
};
