/*!
 * resolve-glob <https://github.com/jonschlinkert/resolve-glob>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var path = require('path');
var utils = require('./utils');

/**
 * async
 */

module.exports = function(patterns, options, cb) {
  if (typeof options === 'function') {
    cb = options;
    options = {};
  }

  if (typeof cb !== 'function') {
    throw new Error('expected a callback function.');
  }

  if (!utils.isValidGlob(patterns)) {
    return cb(new Error('expected a valid glob pattern.'));
  }

  var opts = createOptions(options);
  var nonull = opts.nonull === true;
  delete opts.nonull;

  utils.glob(patterns, opts, function (err, files) {
    if (err) return cb(err);

    if (!files.length && nonull) {
      return cb(null, arrayify(patterns));
    }
    cb(null, resolveFiles(files, opts));
  });
};

/**
 * sync
 */

module.exports.sync = function(patterns, options) {
  if (!utils.isValidGlob(patterns)) {
    throw new Error('expected a valid glob pattern.');
  }

  var opts = createOptions(options);
  var nonull = opts.nonull === true;
  delete opts.nonull;

  var files = utils.glob.sync(patterns, opts);
  if (!files.length && nonull) {
    return arrayify(patterns);
  }
  return resolveFiles(files, opts);
};

/**
 * Utils
 */

function arrayify(val) {
  return val ? (Array.isArray(val) ? val : [val]) : [];
}

function createOptions(options) {
  var opts = utils.extend({cwd: process.cwd()}, options);
  opts.cwd = path.resolve(utils.resolve(opts.cwd));
  return opts;
}

function resolveFiles(files, opts) {
  var len = files.length, i = -1;
  while (++i < len) {
    files[i] = resolveFile(files[i], opts);
  }
  return files;
}

function resolveFile(fp, opts) {
  fp = path.resolve(opts.cwd, fp);
  if (opts.relative) {
    fp = utils.relative(process.cwd(), fp);
  }
  return fp;
}
