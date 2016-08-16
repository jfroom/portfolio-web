# async-helpers [![NPM version](https://img.shields.io/npm/v/async-helpers.svg?style=flat)](https://www.npmjs.com/package/async-helpers) [![NPM downloads](https://img.shields.io/npm/dm/async-helpers.svg?style=flat)](https://npmjs.org/package/async-helpers) [![Build Status](https://img.shields.io/travis/doowb/async-helpers.svg?style=flat)](https://travis-ci.org/doowb/async-helpers)

Use async helpers in templates with engines that typically only handle sync helpers. Handlebars and Lodash have been tested.

## Install

Install with [npm](https://www.npmjs.com/):

```sh
$ npm install async-helpers --save
```

## Usage

```js
var asyncHelpers = require('async-helpers');
```

## API

### [AsyncHelpers](index.js#L26)

Create a new instance of AsyncHelpers

**Params**

* `options` **{Object}**: options to pass to instance
* `returns` **{Object}**: new AsyncHelpers instance

**Example**

```js
var asyncHelpers = new AsyncHelpers();
```

### [.set](index.js#L62)

Add a helper to the cache.

**Params**

* `name` **{String}**: Name of the helper
* `fn` **{Function}**: Helper function
* `returns` **{Object}**: Returns `this` for chaining

**Example**

```js
asyncHelpers.set('upper', function(str, cb) {
  cb(null, str.toUpperCase());
});
```

### [.get](index.js#L85)

Get all helpers or a helper with the given name.

**Params**

* `name` **{String}**: Optionally pass in a name of a helper to get.
* `options` **{Object}**: Additional options to use.
* `returns` **{Function|Object}**: Single helper function when `name` is provided, otherwise object of all helpers

**Example**

```js
var helpers = asyncHelpers.get();
var wrappedHelpers = helperAync.get({wrap: true});
```

### [.wrap](index.js#L197)

Wrap a helper with async handling capibilities.

**Params**

* `name` **{String}**: Optionally pass the name of the helper to wrap
* `returns` **{Function|Object}**: Single wrapped helper function when `name` is provided, otherwise object of all wrapped helpers.

**Example**

```js
var wrappedHelper = asyncHelpers.wrap('upper');
var wrappedHelpers = asyncHelpers.wrap();
```

### [.reset](index.js#L218)

Reset all the stashed helpers.

* `returns` **{Object}**: Returns `this` to enable chaining

**Example**

```js
asyncHelpers.reset();
```

### [.resolveId](index.js#L243)

Resolve a stashed helper by the generated id. This is a generator function and should be used with [co](https://github.com/tj/co)

**Params**

* `key` **{String}**: ID generated when from executing a wrapped helper.

**Example**

```js
var upper = asyncHelpers.get('upper', {wrap: true});
var id = upper('doowb');

co(asyncHelpers.resolveId(id))
  .then(console.log)
  .catch(console.error);

//=> DOOWB
```

### [.resolveIds](index.js#L370)

After rendering a string using wrapped async helpers, use `resolveIds` to invoke the original async helpers and replace the async ids with results from the async helpers.

**Params**

* `str` **{String}**: String containing async ids
* `cb` **{Function}**: Callback function accepting an `err` and `content` parameters.

**Example**

```js
asyncHelpers.resolveIds(renderedString, function(err, content) {
  if (err) return console.error(err);
  console.log(content);
});
```

## Related projects

You might also be interested in these projects:

* [assemble](https://www.npmjs.com/package/assemble): Assemble is a powerful, extendable and easy to use static site generator for node.js. Used… [more](https://www.npmjs.com/package/assemble) | [homepage](https://github.com/assemble/assemble)
* [co](https://www.npmjs.com/package/co): generator async control flow goodness | [homepage](https://github.com/tj/co)
* [generate](https://www.npmjs.com/package/generate): Fast, composable, highly pluggable project generator with a user-friendly and expressive API. | [homepage](https://github.com/generate/generate)
* [templates](https://www.npmjs.com/package/templates): System for creating and managing template collections, and rendering templates with any node.js template engine.… [more](https://www.npmjs.com/package/templates) | [homepage](https://github.com/jonschlinkert/templates)
* [verb](https://www.npmjs.com/package/verb): Documentation generator for GitHub projects. Verb is extremely powerful, easy to use, and is used… [more](https://www.npmjs.com/package/verb) | [homepage](https://github.com/verbose/verb)

## Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/doowb/async-helpers/issues/new).

## Building docs

Generate readme and API documentation with [verb](https://github.com/verbose/verb):

```sh
$ npm install verb && npm run docs
```

Or, if [verb](https://github.com/verbose/verb) is installed globally:

```sh
$ verb
```

## Running tests

Install dev dependencies:

```sh
$ npm install -d && npm test
```

## Author

**Brian Woodward**

* [github/doowb](https://github.com/doowb)
* [twitter/doowb](http://twitter.com/doowb)

## License

Copyright © 2016, [Brian Woodward](https://github.com/doowb).
Released under the [MIT license](https://github.com/doowb/async-helpers/blob/master/LICENSE).

***

_This file was generated by [verb](https://github.com/verbose/verb), v0.9.0, on June 06, 2016._