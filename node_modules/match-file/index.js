/*!
 * match-file <https://github.com/jonschlinkert/match-file>
 *
 * Copyright (c) 2016, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var mm = require('micromatch');
var path = require('path');

function matchFile(name, file) {
  if (typeof name !== 'string') {
    throw new TypeError('expected name to be a string');
  }
  if (!isObject(file)) {
    throw new TypeError('expected file to be an object');
  }

  return (name === file.key)
    || (name === file.path)
    || (name === file.relative)
    || (name === file.basename)
    || (name === file.stem)
    || (path.resolve(file.path) === path.resolve(name));
}

matchFile.matcher = function(pattern, options) {
  if (typeof pattern !== 'string' && !Array.isArray(pattern)) {
    throw new TypeError('expected pattern to be a string or array');
  }

  var isMatch = mm.matcher(pattern, options);
  return function(file) {
    if (typeof file === 'string') {
      return isMatch(file);
    }

    return (pattern === file.key)
      || (pattern === file.path)
      || (pattern === file.relative)
      || (pattern === file.basename)
      || (pattern === file.stem)
      || (path.resolve(file.path) === path.resolve(pattern))
      || isMatch(file.key)
      || isMatch(file.path)
      || isMatch(file.relative)
      || isMatch(file.basename)
      || isMatch(file.stem)
      || isMatch(path.resolve(file.path));
  };
};

matchFile.isMatch = function(patterns, file, options) {
  return matchFile.matcher(patterns, options)(file);
};

function isObject(val) {
  return val && typeof val === 'object';
}

/**
 * Expose `matchFile`
 */

module.exports = matchFile;
