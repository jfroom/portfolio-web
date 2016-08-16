<p align="center">
  <a href="http://gulpjs.com">
    <img height="257" width="114" src="https://raw.githubusercontent.com/gulpjs/artwork/master/gulp-2x.png">
  </a>
</p>

# value-or-function

[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url] [![Build Status][travis-image]][travis-url] [![AppVeyor Build Status][appveyor-image]][appveyor-url] [![Coveralls Status][coveralls-image]][coveralls-url] [![Gitter chat][gitter-image]][gitter-url]

Normalize a value or function, applying extra args to the function

## Example

```js
var normalize = require('value-of-function');

// Values matching type are returned
var isEnabled = normalize('boolean', true);
// isEnabled === true

// Values not matching type return null
var isEnabled = normalize('boolean', 1);
// isEnabled === null

// Functions are called
var isEnabled = normalize('boolean', function() {
  return false;
});
// isEnabled === false

// Extra arguments are applied to function
var count = normalize('number', function(a, b) {
  return a + b;
}, 1, 2);
// count === 3

// Values one of multiple types are returned
var isEnabled = normalize(['string', 'boolean'], true);
// isEnabled === true

// Values matching predicate are returned
var now = new Date();
var enabledSince = normalize(function(value) {
  return value.constructor === Date;
}, now);
// enabledSince === now

// Convenience methods are available
var result = normalize.object({});
var result = normalize.number(1);
var result = normalize.string('');
var result = normalize.symbol(Symbol());
var result = normalize.boolean(true);
var result = normalize.function(function() {});
var result = normalize.undefined(undefined);
var result = normalize.date(new Date());
var result = normalize.date(1);
```

## API

### `normalize(predicate, value[, ...appliedArguments])`

Takes a predicate function `predicate` to test against `value`. Also optionally takes any extra arguments to apply to `value` if `value` is a function.

If the result of `predicate(value)` is true, the value is returned. If false and `value` is a function, the function is called with any extra arguments supplied to `normalize`.

If `value` is neither match for the predicate or a function, `null` is returned.

If `value` is a function and the result of calling the function does not match the predicate, `null` is returned.

If `predicate` is a string, the applied predicate is `typeof value === predicate`.

If `predicate` is an array, `normalized` is called with each element in turn until one matches or none matches.

#### `normalize.object(value[, ...appliedArguments])`

Convenience method for `normalize('object', ...)`.

#### `normalize.number(value[, ...appliedArguments])`

Convenience method for `normalize('number', ...)`.

#### `normalize.string(value[, ...appliedArguments])`

Convenience method for `normalize('string', ...)`.

#### `normalize.symbol(value[, ...appliedArguments])`

Convenience method for `normalize('symbol', ...)`.

#### `normalize.boolean(value[, ...appliedArguments])`

Convenience method for `normalize('boolean', ...)`.

#### `normalize.function(value[, ...appliedArguments])`

Convenience method for `normalize('function', ...)`.

#### `normalize.undefined(value[, ...appliedArguments])`

Convenience method for `normalize('undefined', ...)`.

#### `normalize.date(value[, ...appliedArguments])`

Convenience method for `normalize(dateOrTimestamp, ...)` where `dateOrTimestamp` accepts both numbers and instances of `Date`.

## License

MIT

[downloads-image]: http://img.shields.io/npm/dm/value-or-function.svg
[npm-url]: https://npmjs.org/package/value-or-function
[npm-image]: http://img.shields.io/npm/v/value-or-function.svg

[travis-url]: https://travis-ci.org/gulpjs/value-or-function
[travis-image]: http://img.shields.io/travis/gulpjs/value-or-function.svg?label=travis-ci

[appveyor-url]: https://ci.appveyor.com/project/gulpjs/value-or-function
[appveyor-image]: https://img.shields.io/appveyor/ci/gulpjs/value-or-function.svg?label=appveyor

[coveralls-url]: https://coveralls.io/r/gulpjs/value-or-function
[coveralls-image]: http://img.shields.io/coveralls/gulpjs/value-or-function/master.svg

[gitter-url]: https://gitter.im/gulpjs/gulp
[gitter-image]: https://badges.gitter.im/gulpjs/gulp.png
