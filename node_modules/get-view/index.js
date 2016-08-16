/*!
 * get-vinyl-file <https://github.com/jonschlinkert/get-vinyl-file>
 *
 * Copyright (c) 2016, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var isObject = require('isobject');
var isMatch = require('match-file');
var path = require('path');

module.exports = function getFile(name, collection, fn) {
  var file = collection[name];
  if (file) return file;

  if (typeof fn === 'function') {
    file = collection[fn(name)];
    if (file) return file;
  }

  for (var key in collection) {
    file = collection[key];
    if (!isObject(file)) {
      throw new TypeError('expected file to be an object');
    }
    if (typeof file.path !== 'string') {
      throw new TypeError('expected file.path to be a string');
    }
    if (isMatch(name, file)) {
      return file;
    }
  }
};
