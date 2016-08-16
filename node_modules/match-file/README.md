# match-file [![NPM version](https://img.shields.io/npm/v/match-file.svg?style=flat)](https://www.npmjs.com/package/match-file) [![NPM downloads](https://img.shields.io/npm/dm/match-file.svg?style=flat)](https://npmjs.org/package/match-file) [![Build Status](https://img.shields.io/travis/jonschlinkert/match-file.svg?style=flat)](https://travis-ci.org/jonschlinkert/match-file)

Returns true when the given `name` matches any of the path properties on a vinyl file.

## Install

Install with [npm](https://www.npmjs.com/):

```sh
$ npm install match-file --save
```

## Usage

```js
var matchFile = require('match-file');
```

## API

### matchFile

Returns true if the given string matches one of the path properties on the `file` object (does not match agains `file.extname` only)

```js
var File = require('vinyl');
var matchFile = require('match-file');

var file = new File({path: 'a/b/c.txt', base: 'a'});
var isMatch = matchFile('c.txt', file);
//=> true (since `c.txt` matches file.basename)
```

**Examples**

Continuing with the above setup code, all of the following would return `true`:

```js
// file.path
matchFile('a/b/c.txt', file);
// file.relative
matchFile('b/c.txt', file);
// file.basename
matchFile('c.txt', file);
// file.stem
matchFile('c', file);
```

### .isMatch

Similar to `matchFile`, but **also supports glob patterns** for matching. [micromatch](https://github.com/jonschlinkert/micromatch) is used for matching, visit that project to see all available features and options.

```js
var file = new File({path: 'a/b/c.txt'});
console.log(matcher.isMatch('*.js', file));
//=> false

var file = new File({path: 'a/b/c.js'});
console.log(matcher.isMatch('*.js', file));
//=> true
```

#### Examples

```js
var File = require('vinyl');
var matchFile = require('match-file');

var file = new File({path: 'a/b/c/d/e.txt', base: 'a/b/c'});
file.key = 'zzz/a.txt'; // arbitrary key (for caching)
```

```js
// file.path
console.log(matchFile.isMatch('a/b/c/d/e.txt', file));
// file.relative
console.log(matchFile.isMatch('d/e.txt', file));
// file.basename
console.log(matchFile.isMatch('e.txt', file));
// file.stem
console.log(matchFile.isMatch('e', file));
// file.key
console.log(matchFile.isMatch('zzz/a.txt', file));
// glob pattern for `file.path`
console.log(matchFile.isMatch('**/*.txt', file));
// glob pattern for `file.relative`
console.log(matchFile.isMatch('d/*.txt', file));
// glob pattern for `file.stem`
console.log(matchFile.isMatch('*', file));
// glob pattern for `file.basename`
console.log(matchFile.isMatch('*.txt', file));
```

### .matcher

Returns a matcher function bound to the given glob `patterns` and `options`. [micromatch](https://github.com/jonschlinkert/micromatch) is used for matching, visit that project to see all available features and options.

```js
var isMatch = matchFile.matcher('*.js');
console.log(isMatch);
//=> [function]

var file = new File({path: 'a/b/c.txt'});
console.log(isMatch(file));
//=> false

var file = new File({path: 'a/b/c.js'});
console.log(isMatch(file));
//=> true
```

#### Examples

Given this setup code:

```js
var File = require('vinyl');
var matchFile = require('match-file');

var file = new File({path: 'a/b/c/d/e.txt', base: 'a/b/c'});
file.key = 'zzz/a.txt'; // arbitrary key (for caching)
```

All of the following examples would return `true`:

```js
// file.path
var isMatch = matchFile.matcher('a/b/c/d/e.txt');
console.log(isMatch(file));
// file.relative
var isMatch = matchFile.matcher('d/e.txt');
console.log(isMatch(file));
// file.basename
var isMatch = matchFile.matcher('e.txt');
console.log(isMatch(file));
// file.stem
var isMatch = matchFile.matcher('e');
console.log(isMatch(file));
// file.key
var isMatch = matchFile.matcher('zzz/a.txt');
console.log(isMatch(file));
// glob pattern for `file.path`
var isMatch = matchFile.matcher('**/*.txt');
console.log(isMatch(file));
// glob pattern for `file.relative`
var isMatch = matchFile.matcher('d/*.txt');
console.log(isMatch(file));
// glob pattern for `file.stem`
var isMatch = matchFile.matcher('*');
console.log(isMatch(file));
// glob pattern for `file.basename`
var isMatch = matchFile.matcher('*.txt');
console.log(isMatch(file));
```

## Gulp usage

Use in your [gulp](http://gulpjs.com) plugin:

```js
var though = require('though2');
var gulp = require('gulp');

gulp.task('example', function() {
  return gulp.src('src/**/*')
    .pipe(filter('*.js'));
});

function filter(pattern, options) {
  // define a matcher function outside of the plugin function
  var isMatch = matchFile.matcher(pattern, options);

  return through.obj(function(file, enc, next) {
    // use the matcher function
    if (isMatch(file)) {
      next(null, file);
      return;
    }
    next();
  });
}
```

## Related projects

You might also be interested in these projects:

* [assemble](https://www.npmjs.com/package/assemble): Assemble is a powerful, extendable and easy to use static site generator for node.js. Used… [more](https://www.npmjs.com/package/assemble) | [homepage](https://github.com/assemble/assemble)
* [generate](https://www.npmjs.com/package/generate): Fast, composable, highly extendable project generator with a user-friendly and expressive API. | [homepage](https://github.com/generate/generate)
* [get-view](https://www.npmjs.com/package/get-view): Utility for getting an assemble view from a collection object. | [homepage](https://github.com/jonschlinkert/get-view)
* [micromatch](https://www.npmjs.com/package/micromatch): Glob matching for javascript/node.js. A drop-in replacement and faster alternative to minimatch and multimatch. | [homepage](https://github.com/jonschlinkert/micromatch)
* [verb](https://www.npmjs.com/package/verb): Documentation generator for GitHub projects. Verb is extremely powerful, easy to use, and is used… [more](https://www.npmjs.com/package/verb) | [homepage](https://github.com/verbose/verb)

## Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/jonschlinkert/match-file/issues/new).

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

**Jon Schlinkert**

* [github/jonschlinkert](https://github.com/jonschlinkert)
* [twitter/jonschlinkert](http://twitter.com/jonschlinkert)

## License

Copyright © 2016, [Jon Schlinkert](https://github.com/jonschlinkert).
Released under the [MIT license](https://github.com/jonschlinkert/match-file/blob/master/LICENSE).

***

_This file was generated by [verb](https://github.com/verbose/verb), v0.9.0, on April 26, 2016._