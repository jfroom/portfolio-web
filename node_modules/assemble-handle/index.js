/*!
 * assemble-handle <https://github.com/jonschlinkert/assemble-handle>
 *
 * Copyright (c) 2016, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var through = require('through2');

/**
 * Plugin for handling middleware
 *
 * @param {Object} `app` Instance of "app" (assemble, verb, etc) or a collection
 * @param {String} `stage` the middleware stage to run
 */

module.exports = function handle(app, stage) {
  return through.obj(function(file, enc, next) {
    if (typeof app.handle !== 'function') {
      next(null, file);
      return;
    }

    if (typeof file.options === 'undefined') {
      file.options = {};
    }

    if (file.isNull()) {
      next(null, file);
      return;
    }
    app.handle(stage, file, next);
  });
};

module.exports.once = function handleOnce(app, stage) {
  return through.obj(function(file, enc, next) {
    if (typeof app.handle !== 'function') {
      next(null, file);
      return;
    }

    if (typeof file.options === 'undefined') {
      file.options = {};
    }

    if (file.isNull()) {
      next(null, file);
      return;
    }
    app.handleOnce(stage, file, next);
  });
};
