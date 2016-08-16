/*
 * Grunt Assemble Plugin: Contextual
 * https://github.com/assemble/grunt-assemble-contextual
 *
 * Copyright (c) 2014-2015 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

var path  = require('path');
var sort  = require('sort-object');

/**
 * @param  {Object}   params
 * @param  {Function} callback
 * @return {String}   The permalink string
 */
module.exports = function(params, callback) {

  'use strict';

  var options    = params.context;
  var grunt      = params.grunt;

  var contextual = options.contextual || {};
  var pages      = options.pages;
  var page       = options.page;

  var async      = grunt.util.async;

  contextual.dest = contextual.dest || page.filePair.orig.dest + '/tmp';

  async.forEachSeries(pages, function(file, next) {

    if (page.src !== file.src) {next(); return;}
    var outputDir = path.join(contextual.dest, path.dirname(file.src), file.basename);
    grunt.file.write(outputDir + '.json', JSON.stringify(sort(options), null, 2));

    grunt.verbose.ok('Generating context for: '.yellow + file.dest);
    next();
  }, function (err) {
    callback();
  });
};
