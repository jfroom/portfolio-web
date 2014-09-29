# frep [![NPM version](https://badge.fury.io/js/frep.png)](http://badge.fury.io/js/frep)

> A find and replace utility. Modify strings by passing an array of RegExp or string replacement patterns


## Quickstart

```bash
npm i frep --save
```

```js
var frep = require('frep');

// Transform a string with an array of replacement patterns
frep.strWithArr(String, replacements);
// Transform an array of strings with an array of replacement patterns
frep.arrWithArr(Array,  replacements);
// Transform a string with an object of replacement patterns
frep.strWithObj(String, replacements);
// Transform an array of strings with an object of replacement patterns
frep.arrWithObj(Array,  replacements);
```



## Methods

### strWithArr
Transform a string with an array of replacement patterns.

```js
frep.strWithArr(String, Array)
```

Parameters:

* `String`: The string to modify with the given replacement patterns.
* `Array`: Array of objects containing the replacement patterns, each including a `pattern` property (which can be a string or a RegExp), and a `replacement` property (which can be a string or a function to be called for each match).
* A new string is returned with some or all matches replaced by the given replacement patterns.


Given the following:

```js
var frep = require('frep');

var str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
var patterns = [
  {
    pattern: /(A|B|C)/g,
    replacement: '###'
  },
  {
    pattern: /(X|Y|Z)/g,
    replacement: '$$$'
  },
  ...
];

frep.strWithArr(str, patterns));
// => #########DEFGHIJKLMNOPQRSTUVW$$$$$$$$$
```


### arrWithArr
Transform an array of strings with an array of replacement patterns

```js
frep.arrWithArr(Array, Array)
```

Parameters:

* `Array`: The string to modify with the given replacement patterns.
* `Array`: Same as `replacStr`, this is an an array of objects containing the replacement patterns, each including a `pattern` property, which can be a string or a RegExp, and a `replacement` property, which can be a string or a function to be called for each match.
* A new array of strings is returned with some or all matches replaced by the given replacement patterns.

Given the following:

```js
var frep = require('frep');

var arr = [
  'Jon Schlinkert',
  'Brian Woodward'
];
var patterns = [
  {
    pattern: /(B|S)/g,
    replacement: '###'
  },
  {
    pattern: /(J|W)/g,
    replacement: '$$$'
  },
  ...
];

frep.arrWithArr(arr, patterns));
// => ["$$$on ###chlinkert", "###rian $$$oodward"]
```

An array of new strings is returned, with some or all matches in each string replaced by the given replacement strings.



### strWithObj
Transform a string with an object of replacement patterns

```js
frep.strWithObj(String, Object)
```

Parameters:

* `String`: The string to modify with the given replacement patterns.
* `Object`: Object of replacement patterns, where each key is a string or a RegExp `pattern`, and each value is the `replacement` string or function to be called for each match.
* A new string is returned with some or all matches replaced by the given replacement patterns.


Given the following:

```js
var frep = require('frep');

var str = 'ABC'
var replacements = {
  'A': 'AAA',
  'B': 'BBB',
  'C': 'CCC',
  'D': 'DDD',
  'E': 'EEE',
  'F': 'FFF'
};

frep.strWithObj(str, replacements));
// => AAABBBCCC
```


### arrWithObj
Transform an array of strings with an object of replacement patterns

```js
frep.arrWithObj(Array, Object)
```

Parameters:

* `Array`: The array of strings to modify with the given replacement patterns.
* `Object`: Object of replacement patterns, where each key is a string or a RegExp `pattern`, and each value is the `replacement` string or function to be called for each match.
* A new array of strings is returned with some or all matches replaced by the given replacement patterns.


Given the following:

```js
var frep = require('frep');

var arr = ['ABC', 'DEF'];
var replacements = {
  'A': 'AAA',
  'B': 'BBB',
  'C': 'CCC',
  'D': 'DDD',
  'E': 'EEE',
  'F': 'FFF'
};

frep.arrWithObj(arr, replacements));
// => ['AAABBBCCC', 'DDDEEEFFF']
```


## Author

+ [github/jonschlinkert](http://github/jonschlinkert)
+ [twitter/jonschlinkert](http://twitter.com/jonschlinkert)


## License
Copyright (c) 2013 Jon Schlinkert
Licensed under the [MIT license](LICENSE-MIT).

***

Project created by [Jon Schlinkert](https://github.com/jonschlinkert).

_This file was generated on Wed Sep 18 2013 00:03:54._
