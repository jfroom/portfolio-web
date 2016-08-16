'use strict';

var utils = require('./utils');

/**
 * Expose `Engines`
 */

module.exports = Engines;

/**
 * ```js
 * var Engines = require('engine-cache');
 * var engines = new Engines();
 * ```
 *
 * @param {Object} `engines` Optionally pass an object of engines to initialize with.
 * @api public
 */

function Engines(engines, options) {
  this.options = options || {};
  this.cache = engines || {};
  this.AsyncHelpers = this.options.AsyncHelpers || require('async-helpers');
  this.Helpers = this.options.Helpers || require('helper-cache');
}

/**
 * Register the given view engine callback `fn` as `ext`.
 *
 * ```js
 * var consolidate = require('consolidate')
 * engines.setEngine('hbs', consolidate.handlebars)
 * ```
 *
 * @param {String} `ext`
 * @param {Object|Function} `options` or callback `fn`.
 * @param {Function} `fn` Callback.
 * @return {Object} `Engines` to enable chaining.
 * @api public
 */

Engines.prototype.setEngine = function(ext, fn, opts) {
  var engine = normalizeEngine(fn, opts);

  engine.helpers = new this.Helpers(engine.options);
  engine.asyncHelpers = new this.AsyncHelpers(engine.options);
  engine.name = utils.stripExt(engine.name || engine.options.name || ext);
  engine.options.ext = utils.formatExt(ext);

  // decorate wrapped methods for async helper handling
  decorate(engine);
  // add custom inspect method
  inspect(engine);
  // set the engine on the cache
  this.cache[engine.options.ext] = engine;
  return this;
};

/**
 * Add an object of engines onto `engines.cache`.
 *
 * ```js
 * engines.setEngines(require('consolidate'))
 * ```
 *
 * @param  {Object} `obj` Engines to load.
 * @return {Object} `Engines` to enable chaining.
 * @api public
 */

Engines.prototype.setEngines = function(engines) {
  for (var key in engines) {
    if (engines.hasOwnProperty(key) && key !== 'clearCache') {
      this.setEngine(key, engines[key]);
    }
  }
  return this;
};

/**
 * Return the engine stored by `ext`. If no `ext`
 * is passed, undefined is returned.
 *
 * ```js
 * var consolidate = require('consolidate');
 * var engine = engine.setEngine('hbs', consolidate.handlebars);
 *
 * var engine = engine.getEngine('hbs');
 * console.log(engine);
 * // => {render: [function], renderFile: [function]}
 * ```
 *
 * @param {String} `ext` The engine to get.
 * @return {Object} The specified engine.
 * @api public
 */

Engines.prototype.getEngine = function(ext) {
  if (!ext) return;
  var engine = this.cache[utils.formatExt(ext)];
  if (typeof engine === 'undefined' && this.options.defaultEngine) {
    if (typeof this.options.defaultEngine === 'string') {
      return this.cache[utils.formatExt(this.options.defaultEngine)];
    }
    return this.options.defaultEngine;
  }
  return engine;
};

/**
 * Get and set helpers for the given `ext` (engine). If no
 * `ext` is passed, the entire helper cache is returned.
 *
 * **Example:**
 *
 * ```js
 * var helpers = engines.helpers('hbs');
 * helpers.addHelper('bar', function() {});
 * helpers.getEngineHelper('bar');
 * helpers.getEngineHelper();
 * ```
 *
 * See [helper-cache] for any related issues, API details, and documentation.
 *
 * @param {String} `ext` The helper cache to get and set to.
 * @return {Object} Object of helpers for the specified engine.
 * @api public
 */

Engines.prototype.helpers = function(ext) {
  return this.getEngine(ext).helpers;
};

/**
 * Normalize engine so that `.render` is a property on the `engine` object.
 */

function normalizeEngine(fn, options) {
  if (utils.isEngine(options)) {
    return normalizeEngine(options, fn);
  }

  if (!utils.isObject(fn) && typeof fn !== 'function') {
    throw new TypeError('expected an object or function');
  }

  var engine = {};
  engine.render = fn.render || fn;
  engine.options = utils.extend({}, options);

  if (typeof engine.render !== 'function') {
    throw new Error('expected engine to have a render method');
  }

  for (var key in fn) {
    if (key === 'options') {
      engine.options = utils.extend({}, engine.options, fn[key]);
      continue;
    }
    if (key === '__express') {
      engine.renderFile = fn[key];
    }
    engine[key] = fn[key];
  }
  return engine;
}

/**
 * Wrap engines to extend the helpers object and other
 * native methods or functionality.
 *
 * ```js
 * engines.decorate(engine);
 * ```
 *
 * @param  {Object} `engine` The engine to wrap.
 * @return {Object} The wrapped engine.
 * @api private
 */

function decorate(engine) {
  // save a reference to original methods
  var renderSync = engine.renderSync;
  var render = engine.render;
  var compile = engine.compile;

  /**
   * Wrapped compile function for all engines loaded onto engine-cache.
   * If possible, compiles the string with the original engine's compile function.
   * Returns a render function that will either use the original engine's compiled function
   * or the `render/renderSync` methods and will resolve async helper ids.
   *
   * ```js
   * var fn = engine.compile('<%= upper(foo) %>', {imports: {'upper': upper}});
   * fn({foo: 'bar'}));
   * //=> BAR
   * ```
   *
   * @param  {String} `str` Original string to compile.
   * @param  {Object} `opts` Options/settings to pass to engine's compile function.
   * @return {Function} Returns render function to call that takes `locals` and optional `callback` function.
   */

  engine.compile = function engineCompile(str, settings) {
    if (typeof str === 'function') {
      return str;
    }

    if (typeof settings !== 'undefined' && !utils.isObject(settings)) {
      throw new TypeError('expected settings to be an object or undefined');
    }

    settings = utils.extend({}, settings);
    var helpers = mergeHelpers(engine, settings);
    var compiled = compile ? compile(str, helpers) : null;

    return function(locals, cb) {
      if (typeof locals === 'function') {
        cb = locals;
        locals = {};
      }

      if (typeof compiled === 'function') {
        str = compiled;

        // these have already been passed into the
        // engine during compile time
        delete helpers.helpers;
        delete helpers.partials;
      }

      var data = {};
      if (settings && typeof settings.mergeFn === 'function') {
        data = settings.mergeFn(helpers, locals);
      } else {
        data = utils.extend({}, locals, helpers);
      }

      if (typeof cb !== 'function') {
        return renderSync(str, data);
      }

      render(str, data, function(err, str) {
        if (err) {
          cb(err);
          return;
        }
        engine.asyncHelpers.resolveIds(str, cb);
      });
    };
  };

  /**
   * Wrapped render function for all engines loaded onto engine-cache.
   * Compiles and renders strings with given context.
   *
   * ```js
   *  engine.render('<%= foo %>', {foo: 'bar'}, function(err, content) {
   *    //=> bar
   *  });
   * ```
   *
   * @param  {String|Function} `str` Original string to compile or function to use to render.
   * @param  {Object} `options` Options/locals to pass to compiled function for rendering.
   * @param {Function} `cb` Callback function that returns `err, content`.
   */

  engine.render = function engineRender(str, locals, cb) {
    if (typeof locals === 'function') {
      cb = locals;
      locals = {};
    }

    if (typeof cb !== 'function') {
      throw new TypeError('expected a callback function');
    }

    if (typeof str === 'function') {
      str(locals, cb);
      return;
    }

    if (typeof str !== 'string') {
      cb(new TypeError('expected a string or compiled function'));
      return;
    }

    var async = locals.async;
    locals.async = true;

    // compile the template to create a function
    var fn = this.compile(str, locals);

    // call the function to render templates
    fn(locals, function(err, content) {
      if (err) {
        cb(err);
        return;
      }
      // reset original `async` value
      locals.async = async;
      cb(null, content);
    });
  };

  /**
   * Wrapped renderSync function for all engines loaded onto engine-cache.
   * Compiles and renders strings with given context.
   *
   * ```js
   * engine.renderSync('<%= foo %>', {foo: 'bar'});
   * //=> bar
   * ```
   *
   * @param  {String|Function} `str` Original string to compile or function to use to render.
   * @param  {Object} `locals` Locals or options to pass to compiled function for rendering.
   * @return {String} Returns rendered content.
   */

  engine.renderSync = function wrappedRenderSync(str, locals) {
    if (typeof str === 'function') {
      return str(locals);
    }

    if (typeof str !== 'string') {
      throw new TypeError('expected a string or compiled function');
    }

    var context = utils.extend({}, locals);
    context.helpers = utils.merge({}, this.helpers, context.helpers);
    var render = this.compile(str, context);
    return render(context);
  };
}

/**
 * Add a custom inspect function onto the engine.
 */

function inspect(engine) {
  var inspect = ['"' + engine.name + '"'];
  var exts = utils.arrayify(engine.options.ext).join(', ');
  inspect.push('<ext "' + exts + '">');
  engine.inspect = function() {
    return '<Engine ' + inspect.join(' ') + '>';
  };
}

/**
 * Merge the local engine helpers with the options helpers.
 *
 * @param  {Object} `options` Options passed into `render` or `compile`
 * @return {Object} Options object with merged helpers
 */

function mergeHelpers(engine, options) {
  if (typeof options !== 'object') {
    throw new TypeError('expected an object');
  }

  var opts = utils.merge({}, options);
  var helpers = utils.merge({}, engine.helpers, opts.helpers);
  if (typeof helpers === 'object') {
    for (var key in helpers) {
      if (helpers.hasOwnProperty(key)) {
        engine.asyncHelpers.set(key, helpers[key]);
      }
    }
  }
  opts.helpers = engine.asyncHelpers.get({wrap: opts.async});
  return opts;
}
