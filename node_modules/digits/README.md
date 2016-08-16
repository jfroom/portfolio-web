# digits [![NPM version](https://badge.fury.io/js/digits.png)](http://badge.fury.io/js/digits)

> Pad numbers with zeros. Automatically pad the number of digits based on the length of the array, or explicitly pass in the number of digits to use.

## Getting Started
Install the module with [npm](npmjs.org):

```bash
npm i digits --save
```
Or install with [Bower](https://github.com/bower/bower):

```bash
bower install digits
```

## Usage

```javascript
var digits = require('digits');

var foo = 'path/to/010bar.md'
digits.pad(foo);
digits.strip(foo);
```

## Methods
### pad

Pad a string with numbers

```javascript
var digits = require('digits');

var foo = 'path/to/010bar.md'
digits.strip(foo);
// => "bar.md"
```

#### pad options
##### digits
Type: `Number`
Default: `4`

The number of digits to pad. By default this is set to `4`. Example `0001`.

Example:

```javascript
var digits = require('digits');
var arr = [1, 2, 3...1001];
console.log(digits.pad(arr, {digits: 6}));
// => 000001, 000002, 000003, 000004...
```

##### auto
Type: `Number`
Default: `undefined`

Pass in the length of an array to automatically calculate the number of zeros to pad. If no length is passed in, the value from the digits option will be used.

Example:

```javascript
var digits = require('digits');

var arr = [1, 2, 3...1001];
var len = arr.length;

console.log(digits.pad(arr, {auto: len}));
// => 0001, 0002, 0003, 0004...
```

### stripleft

Strip leading numbers from a string.

```javascript
var digits = require('digits');
console.log(digits.stripleft('010foo.md'));
// => "foo.md"
```

### stripright

Strip trailing numbers from a string.

```javascript
var digits = require('digits');
console.log(digits.stripright('bar010.md'));
// => "bar.md"
```

### countleft

Count leading numbers in a string.

```javascript
var digits = require('digits');
console.log(digits.countleft('010foo.md'));
// => "3"
```

### countright

Count trailing numbers in a string.

```javascript
var digits = require('digits');
console.log(digits.countright('bar010.md'));
// => "3"
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [grunt](http://gruntjs.com/).

## Author

+ [github/jonschlinkert](https://github.com/jonschlinkert)
+ [twitter/jonschlinkert](http://twitter.com/jonschlinkert)

## License
Copyright (c) 2013 Jon Schlinkert
Licensed under the MIT license.
