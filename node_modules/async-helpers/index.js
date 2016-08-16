/*!
 * async-helpers <https://github.com/doowb/async-helpers>
 *
 * Copyright (c) 2015, Brian Woodward.
 * Licensed under the MIT License.
 */

'use strict';

var utils = require('./utils');
var cache = {};
var stash = {};

/**
 * Create a new instance of AsyncHelpers
 *
 * ```js
 * var asyncHelpers = new AsyncHelpers();
 * ```
 *
 * @param {Object} `options` options to pass to instance
 * @return {Object} new AsyncHelpers instance
 * @api public
 */

function AsyncHelpers(options) {
  if (!(this instanceof AsyncHelpers)) {
    return new AsyncHelpers(options);
  }
  options = options || {};
  this.options = options;
  this.prefix = options.prefix || '{$ASYNCID$';
  this.helpers = {};
  this.counter = 0;
  this.globalCounter = AsyncHelpers.globalCounter++;
}

/**
 * Keep track of instances created for generating globally
 * unique ids
 *
 * @type {Number}
 */

AsyncHelpers.globalCounter = 0;

/**
 * Add a helper to the cache.
 *
 * ```js
 * asyncHelpers.set('upper', function(str, cb) {
 *   cb(null, str.toUpperCase());
 * });
 * ```
 *
 * @param {String} `name` Name of the helper
 * @param {Function} `fn` Helper function
 * @return {Object} Returns `this` for chaining
 * @api public
 */

AsyncHelpers.prototype.set = function(name, fn) {
  if (typeof name !== 'string') {
    throw new TypeError('AsyncHelpers#set expects `name` to be a string.');
  }
  this.helpers[name] = fn;
  return this;
};

/**
 * Get all helpers or a helper with the given name.
 *
 * ```js
 * var helpers = asyncHelpers.get();
 * var wrappedHelpers = helperAync.get({wrap: true});
 * ```
 *
 * @param  {String} `name` Optionally pass in a name of a helper to get.
 * @param  {Object} `options` Additional options to use.
 *   @option {Boolean} `wrap` Wrap the helper(s) with async processing capibilities
 * @return {Function|Object} Single helper function when `name` is provided, otherwise object of all helpers
 * @api public
 */

AsyncHelpers.prototype.get = function(name, opts) {
  if (name == null) {
    throw new TypeError('AsyncHelpers#get expects a string or object.');
  }

  if (typeof name === 'object') {
    opts = name;
    name = null;
  }

  opts = opts || {};
  if (opts.wrap) {
    return this.wrap(name);
  }

  return typeof name === 'string'
    ? this.helpers[name]
    : this.helpers;
};

/**
 * Wrap a helper or object of helpers with an async handler function.
 *
 * @param  {String|Object} `name` Helper or object of helpers
 * @return {Object} Wrapped helper(s)
 */

function wrap(name) {
  if (name == null) {
    throw new TypeError('async-helpers wrap expects a string or object.');
  }
  var helper = this.helpers[name];
  if (typeof helper === 'object') {
    for (var key in helper) {
      if (helper[key].wrapped !== true) {
        helper[key] = wrapper(key, helper[key], this);
      }
    }
    return helper;
  } else {
    if (helper.wrapped === true) {
      return helper;
    }
    return wrapper(name, helper, this);
  }
}

/**
 * Returns a wrapper function for a single helper.
 *
 * @param  {String} `name` The name of the helper
 * @param  {Function} `fn` The actual helper function
 * @param  {Object} `thisArg` Context
 * @return {String} Returns an async ID to use for resolving the value. ex: `{$ASYNCID$!$8$}`
 */

function wrapper(name, fn, thisArg) {
  var prefix = createPrefix(thisArg.prefix, thisArg.globalCounter);

  function wrapped() {
    var argRefs = [];
    var len = arguments.length;
    var args = new Array(len);

    for (var i = len - 1; i >= 0; i--) {
      var re = new RegExp(createRegExp(prefix), 'g');
      var arg = args[i] = arguments[i];

      // store references to other async helpers (string === '__async_0_1')
      if (typeof arg === 'string' && re.test(arg)) {
        argRefs.push({arg: arg, idx: i});
      }
      if (typeof arg === 'object' && typeof arg.hash === 'object') {
        argRefs.push({arg: arg, idx: i});
      }
    }

    // generate a unique ID for the wrapped helper
    var id = createId(prefix, thisArg.counter++);
    var obj = {
      id: id,
      name: name,
      fn: fn,
      args: args,
      argRefs: argRefs,
      thisArg: this
    };

    stash[obj.id] = obj;
    return obj.id;
  }
  Object.defineProperty(wrapped, 'wrapped', {
    configurable: true,
    enumerable: false,
    value: true
  });
  return wrapped;
}

/**
 * Wrap a helper with async handling capibilities.
 *
 * ```js
 * var wrappedHelper = asyncHelpers.wrap('upper');
 * var wrappedHelpers = asyncHelpers.wrap();
 * ```
 *
 * @param  {String} `name` Optionally pass the name of the helper to wrap
 * @return {Function|Object} Single wrapped helper function when `name` is provided, otherwise object of all wrapped helpers.
 * @api public
 */

AsyncHelpers.prototype.wrap = function(name) {
  if (name) return wrap.call(this, name);

  var res = {};
  for (var key in this.helpers) {
    res[key] = this.wrap(key);
  }
  return res;
};

/**
 * Reset all the stashed helpers.
 *
 * ```js
 * asyncHelpers.reset();
 * ```
 *
 * @return {Object} Returns `this` to enable chaining
 * @api public
 */

AsyncHelpers.prototype.reset = function() {
  stash = {};
  this.counter = 0;
  return this;
};

/**
 * Resolve a stashed helper by the generated id.
 * This is a generator function and should be used with [co][]
 *
 * ```js
 * var upper = asyncHelpers.get('upper', {wrap: true});
 * var id = upper('doowb');
 *
 * co(asyncHelpers.resolveId(id))
 *   .then(console.log)
 *   .catch(console.error);
 *
 * //=> DOOWB
 * ```
 *
 * @param  {String} `key` ID generated when from executing a wrapped helper.
 * @api public
 */

AsyncHelpers.prototype.resolveId = function*(key) {
  if (typeof key !== 'string') {
    throw new Error('AsyncHelpers#resolveId() expects `key` to be a string.');
  }
  var self = this;
  var prefix = createPrefix(this.prefix, this.globalCounter);
  var re = cache[prefix] || (cache[prefix] = new RegExp(createRegExp(prefix)));
  var helper = stash[key];
  if (!helper) {
    throw new Error('Unable to resolve ' + key + '. Not Found');
  }

  var res;
  var args = yield this.resolveArgs(helper);

  return yield function(cb) {
    if (typeof helper.fn !== 'function') {
      return cb(null, helper.fn);
    }

    var done = function(err, val) {
      if (typeof val !== 'undefined') {
        helper.fn = val;
        return cb(err, helper.fn);
      } else {
        return cb(err, '');
      }
    };

    if (helper.fn.async) {
      args = args.concat(function(err, result) {
        if (err) return done(formatError(err, helper, args));
        if (re.test(result)) {
          return self.resolveIds(result, done);
        }
        return done(null, result);
      });
    }
    try {
      res = helper.fn.apply(helper.thisArg, args);
      if (re.test(res)) {
        return self.resolveIds(res, done);
      }
    } catch (err) {
      return done(formatError(err, helper, args));
    }
    if (!helper.fn.async) {
      return done(null, res);
    }
  };
};

/**
 * Generator function for resolving helper arguments
 * that contain async ids. This function should be used
 * with [co][].
 *
 * This is used inside `resolveId`:
 *
 * ```js
 * var args = yield co(asyncHelpers.resolveArgs(helper));
 * ```
 * @param {Object} `helper` helper object with an `argRefs` array.
 */

AsyncHelpers.prototype.resolveArgs = function*(helper) {
  var args = helper.args;
  var len = helper.argRefs.length, i = 0;
  while (len--) {
    var ref = helper.argRefs[i++];
    if (typeof ref.arg === 'string') {
      args[ref.idx] = yield this.resolveId(ref.arg);
    } else {
      ref.arg.hash = yield this.resolveObject(ref.arg.hash);
    }
  }
  return args;
};

/**
 * Generator function for resolving values on an object
 * that contain async ids. This function should be used
 * with [co][].
 *
 * This is used inside `resolveArgs`:
 *
 * ```js
 * var args = yield co(asyncHelpers.resolveObject(options.hash));
 * ```
 * @param {Object} `obj` object with with values that may be async ids.
 * @returns {Object} Object with resolved values.
 */

AsyncHelpers.prototype.resolveObject = function*(obj) {
  var prefix = createPrefix(this.prefix, '(\\d)+');
  var re = cache[prefix] || (cache[prefix] = new RegExp('(' + createRegExp(prefix) + ')', 'g'));

  var keys = Object.keys(obj);
  return yield keys.reduce(function(acc, key) {
    return utils.co(function*() {
      var val = acc[key];
      if (typeof val !== 'string' || !re.test(val)) {
        acc[key] = val;
      } else {
        acc[key] = yield this.resolveId(val);
      }
      return acc;
    }.bind(this));
  }.bind(this), obj);
};

/**
 * After rendering a string using wrapped async helpers,
 * use `resolveIds` to invoke the original async helpers and replace
 * the async ids with results from the async helpers.
 *
 * ```js
 * asyncHelpers.resolveIds(renderedString, function(err, content) {
 *   if (err) return console.error(err);
 *   console.log(content);
 * });
 * ```
 * @param  {String} `str` String containing async ids
 * @param  {Function} `cb` Callback function accepting an `err` and `content` parameters.
 * @api public
 */

AsyncHelpers.prototype.resolveIds = function(str, cb) {
  if (typeof cb !== 'function') {
    throw new TypeError('AsyncHelpers#resolveIds() expects a callback function.');
  }
  if (typeof str !== 'string') {
    return cb(new TypeError('AsyncHelpers#resolveIds() expects a string.'));
  }

  var self = this;
  var prefix = createPrefix(this.prefix, '(\\d)+');
  var re = cache[prefix] || (cache[prefix] = new RegExp('(' + createRegExp(prefix) + ')', 'g'));
  var keys = str.match(re);
  utils.co(function*() {
    if (!keys) return str;

    var len = keys.length, i = 0;
    while (len--) {
      var key = keys[i++];
      var val = yield self.resolveId(key);
      str = str.split(key).join(val);
    }
    return str;
  })
  .then(function(res) {
    cb(null, res);
  })
  .catch(function(err) {
    cb(err);
  });
};

/**
 * Format an error message to provide better information about the
 * helper and the arguments passed to the helper when the error occurred.
 *
 * @param  {Object} `err` Error object
 * @param  {Object} `helper` helper object to provide more information
 * @param  {Array} `args` Array of arguments passed to the helper.
 * @return {Object} Formatted Error object
 */

function formatError(err, helper, args) {
  args = args.filter(function(arg) {
    if (!arg || typeof arg === 'function') {
      return false;
    }
    return true;
  }).map(function(arg) {
    return utils.stringify(arg);
  });

  err.reason = '"' + helper.name
    + '" helper cannot resolve: `'
    + args.join(', ') + '`';
  err.helper = helper;
  err.args = args;
  return err;
}

/**
 * Create a prefix to use when generating an async id.
 *
 * @param  {String} `prefix` prefix string to start with.
 * @param  {String} `counter` string to append.
 * @return {String} new prefix
 */

function createPrefix(prefix, counter) {
  return prefix + counter + '$';
}

/**
 * Create an async id from the provided prefix and counter.
 *
 * @param  {String} `prefix` prefix string to start with
 * @param  {String} `counter` string to append.
 * @return {String} async id
 */

function createId(prefix, counter) {
  return prefix + counter + '$}';
}

/**
 * Create a string to pass into `RegExp` for checking for and finding async ids.
 *
 * @param  {String} `prefix` prefix to use for the first part of the regex
 * @return {String} string to pass into `RegExp`
 */

function createRegExp(prefix) {
  var key = 'prefix:' + prefix;
  if (cache[key]) {
    return cache[key];
  }
  var res = prefix.split('$').join('\\\$') + '(\\d)+\\$}';
  return (cache[key] = res);
}

/**
 * Expose `AsyncHelpers`
 */

module.exports = AsyncHelpers;
