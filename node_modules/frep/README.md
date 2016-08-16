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

### .strWithArr( string, array )
Transform a string with an array of replacement patterns.

```js
frep.strWithArr(String, Array)
```

Parameters:

* `String`: The string to modify with the given replacement patterns.
* `Array`: Array of objects containing the replacement patterns, each including a `pattern` property (which can be a string or a RegExp), and a `replacement` property (which can be a string or a function to be called for each match).
* A new string is returned with some or all matches replaced by the given replacement patterns.

**Example 1**

Given the following:

```js
var str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
var patterns = [
  {
    pattern: /[ABC]/g,
    replacement: '###'
  },
  {
    pattern: /[XYZ]/g,
    replacement: '$$$'
  },
  ...
];

frep.strWithArr(str, patterns));
// => #########DEFGHIJKLMNOPQRSTUVW$$$$$$$$$
```

### patterns as arrays

Patterns may also be arrays. When replacement patterns are formatted as arrays Frep will first transform the array into a corresponding RegExp group:

**Example 2**

```js
['[ABC]', '[XYZ]']
```
gets converted to:

```js
 /([ABC]|[XYZ])/gi
 ```

**Example 3**

So the following will produce a similar result to **Example 1**, except `###` is used to replace all patterns:

```js
var str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
var patterns = [
  {
    pattern: ['[ABC]', '[XYZ]'],
    replacement: '###'
  }
];

frep.strWithArr(str, patterns));
// => #########DEFGHIJKLMNOPQRSTUVW#########
```

### .arrWithArr( array, array )
Transform an array of strings with an array of replacement patterns

```js
frep.arrWithArr( Array, Array )
```

Parameters:

* `Array`: The string to modify with the given replacement patterns.
* `Array`: Same as `replacStr`, this is an an array of objects containing the replacement patterns, each including a `pattern` property, which can be a string or a RegExp, and a `replacement` property, which can be a string or a function to be called for each match.
* A new array of strings is returned with some or all matches replaced by the given replacement patterns.

Given the following:

**Example 4**

```js
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



### .strWithObj( string, object )
Transform a string with an object of replacement patterns

```js
frep.strWithObj( String, Object )
```

Parameters:

* `String`: The string to modify with the given replacement patterns.
* `Object`: Object of replacement patterns, where each key is a string or a RegExp `pattern`, and each value is the `replacement` string or function to be called for each match.
* A new string is returned with some or all matches replaced by the given replacement patterns.

**Example 5**

Given the following:

```js
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


### .arrWithObj( array, object )
Transform an array of strings with an object of replacement patterns

```js
frep.arrWithObj(Array, Object)
```

Parameters:

* `Array`: The array of strings to modify with the given replacement patterns.
* `Object`: Object of replacement patterns, where each key is a string or a RegExp `pattern`, and each value is the `replacement` string or function to be called for each match.
* A new array of strings is returned with some or all matches replaced by the given replacement patterns.

**Example 6**

Given the following:

```js
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

## Usage example

### Uses frep.strWithArray( string, array )

> Slugify URL segments using frep

To run the example, first do: `npm install frep underscore.string`

```js
var frep = require('frep');

// We'll use underscore string's slugify function for the first example
var _str = require('underscore.string');

// A custom slugification function for the second
var slugger = function(str) {
  return str.replace(/( |-|\.)/g, '_').toLowerCase();
};

// And a third slugification function for the last example
var sluggifier = function(str) {
  return str.replace(/( |\.)/g, '-');
};

// This is an object of data, where each property will be used
// to build up a URL that needs to be slugified.  e.g.
// => /foo/bar/baz
// (in reality, you would probably have an array of objects like this)
var obj = {
  foo: 'This is foo.',
  bar: 'ThIs iS bAr.',
  baz: 'THIS is BAZ.',
};

// Our custom replacement patterns. These are used to
// transform the data from each property
var patterns = [
  {
    pattern: /:foo/g,
    replacement: _str.slugify(obj.foo) // underscore.string
  },
  {
    pattern: /:bar/g,
    replacement: slugger(obj.bar)  // custom function #1
  },
  {
    pattern: /:baz/g,
    replacement: sluggifier(obj.baz)  // custom function #2
  }
];

// The first argument, a string, will be our "structure",
// which will determine where the values from each property
// will be placed. Run frep to see what happens!
console.log(frep.strWithArr(':foo/:bar/:baz', patterns));
```


## Author

**[Jon Schlinkert](http://github/jonschlinkert)**

+ [github/jonschlinkert](http://github/jonschlinkert)
+ [twitter/jonschlinkert](http://twitter.com/jonschlinkert)


## License
Copyright (c) 2014 [Jon Schlinkert](http://github/jonschlinkert), contributors.
Licensed under the [MIT license](LICENSE-MIT).