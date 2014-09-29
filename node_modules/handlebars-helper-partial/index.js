/**
 * Handlebars Helpers: {{partial}}
 * Copyright (c) 2013 Jon Schlinkert
 * Licensed under the MIT License (MIT).
 */

var path = require('path');
var _ = require('lodash');
var matter = require('gray-matter');



// Export helpers
module.exports.register = function (Handlebars, options, params) {

  'use strict';

  var assemble = params.assemble;
  var grunt = params.grunt;
  var opts = options || {};

  /**
   * {{partial}}
   * Alternative to {{> partial }}
   *
   * @param  {String} name    The name of the partial to use
   * @param  {Object} context The context to pass to the partial
   * @return {String}         Returns compiled HTML
   * @xample: {{partial 'foo' bar}}
   */
  Handlebars.registerHelper('partial', function(name, context) {
    if(!Array.isArray(assemble.partials)) {
      assemble.partials = [assemble.partials];
    }

    var filepath = _.first(_.filter(assemble.partials, function(fp) {
      return path.basename(fp, path.extname(fp)) === name;
    }));

    // Process context, using YAML front-matter,
    // grunt config and Assemble options.data
    var pageObj = matter.read(filepath) || {};
    var metadata = pageObj.context || {};

    // `context`           = the given context (second parameter)
    // `metadata`          = YAML front matter of the partial
    // `opts.data[name]`   = JSON/YAML data file defined in Assemble options.data
    //                       with a basename matching the name of the partial, e.g
    //                       {{include 'foo'}} => foo.json
    // `this`              = Typically either YAML front matter of the "inheriting" page,
    //                       layout, block expression, or "parent" helper wrapping this helper
    // `opts`              = Custom properties defined in Assemble options
    // `grunt.config.data` = Data from grunt.config.data
    //                       (e.g. pkg: grunt.file.readJSON('package.json'))

    var omit = function(target) {
      return _.omit(target, 'pages', 'pagination');
    };

    // Remove page content from `this` and `opts` before creating new context
    context = _.extend({}, grunt.config.data, omit(opts), omit(this), opts.data[name], metadata, context);

    // process any templates inside context property values
    context = grunt.config.process(context);

    // look up this partial name from the partials registered with Handlebars
    var template = Handlebars.partials[name];

    var fn;
    if (!_.isFunction(template)) {
      // not compiled, so we can compile it safely
      fn = Handlebars.compile(template);
    } else {
      // already compiled, just reuse it
      fn = template;
    }

    var output = fn(context).replace(/^\s+/, '');

    // Prepend output with the filepath to the original partial
    var include = opts.include || opts.data.include || {};
    if(include.origin === true) {
      output = '<!-- ' + filepath + ' -->\n' + output;
    }

    return new Handlebars.SafeString(output);
  });
};
