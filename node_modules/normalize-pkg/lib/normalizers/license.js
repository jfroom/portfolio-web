'use strict';

var utils = require('../utils');

module.exports = function(val, key, config, schema) {
  switch (utils.typeOf(val)) {
    case 'object':
      return val.type;
    case 'array':
      return val[0].type;
    case 'string':
    default: {
      return val;
    }
  }
};
