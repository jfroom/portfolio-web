/*
 * Assemble Contrib Plugin: Contextual
 * https://github.com/assemble/assemble-contrib-contextual
 *
 * Copyright (c) 2013 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

// Node.js
var path  = require('path');
var sort  = require('sort-object');

/**
 * @param  {Object}   config
 * @param  {Function} callback
 * @return {String}   The permalink string
 */
module.exports = function(config, callback) {

  'use strict';

  var options    = config.context;
  var grunt      = config.grunt;

  var contextual = options.contextual || {};
  var pages      = options.pages;
  var page       = options.page;

  var async      = grunt.util.async;
  var _          = grunt.util._;

  if(!_.isUndefined(contextual.dest)) {
    async.forEachSeries(pages, function(file, next) {

      if (page.src !== file.src) {next(); return;}

      var outputDir = path.join(contextual.dest, file.basename);
      grunt.file.write(outputDir + '.json', JSON.stringify(sort(options), null, 2));

      grunt.verbose.ok('Generating context for: '.yellow + file.dest);
      next();
    }, function (err) {
      callback();
    });
  }
};
