/*!
 * has-value <https://github.com/jonschlinkert/has-value>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var get = require('get-value');
var hasValues = require('has-values');

module.exports = function (o, path, fn) {
  var len = arguments.length;
  if (len === 1 || (len === 2 && typeof path === 'boolean')) {
    return hasValues.apply(hasValues, arguments);
  }
  if (len === 3 && typeof fn === 'boolean') {
    return hasValues(get.apply(get, arguments), fn);
  }
  return hasValues(get.apply(get, arguments));
};
