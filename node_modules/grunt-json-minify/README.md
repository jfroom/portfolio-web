# grunt-json-minify

[![Build Status](https://travis-ci.org/werk85/grunt-json-minify.svg?branch=master)](https://travis-ci.org/werk85/grunt-json-minify)

Grunt JSON minification task that does not concatinate the output. For concatination use [grunt-minjson](https://github.com/shama/grunt-minjson).

## Getting Started
Install this grunt plugin next to your project's [grunt.js gruntfile][getting_started] with: `npm install grunt-json-minify`

Then add this line to your project's `Gruntfile.js` gruntfile:

```javascript
grunt.loadNpmTasks('grunt-json-minify');
```

[grunt]: http://gruntjs.com/
[getting_started]: https://github.com/gruntjs/grunt/blob/master/docs/getting_started.md

## Usage

Set the `files` parameter to the directory you want to minify. The minification is inplace, so you want to copy the data to the destination before you minify.

Example:

```js
'json-minify': {
  build: {
    files: 'build/**/*.json'
  }
}
```

### Options

 * `encoding`(Default `undefined`) The encoding that should be used for reading and writing the json files.
 * `skipOnError` (Default `false`) Ignore files that produce a parse error while minification.

Internally this plugin uses the `JSON.stringify` and `JSON.parse` method for minification. You can configure this process by the following parameters:

 * `reviver` (Default `undefined`) If a function, prescribes how the value originally produced by parsing is transformed, before being returned.
 * `replacer` (Default `undefined`) A function that alters the behavior of the stringification process, or an array of String and Number objects that serve as a whitelist for selecting the properties of the value object to be included in the JSON string. If this value is null or not provided, all properties of the object are included in the resulting JSON string.
 * `space` (Default `''`) A String or Number object that's used to insert white space into the output JSON string for readability purposes. If this is a Number, it indicates the number of space characters to use as white space; this number is capped at 10 if it's larger than that. Values less than 1 indicate that no space should be used. If this is a String, the string (or the first 10 characters of the string, if it's longer than that) is used as white space. If this parameter is not provided (or is null), no white space is used.

For more informations see the [JSON.parse](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse) and [JSON.stringify](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify) documentation.

If you want to use your own minification algorithm you can overwrite the default behaviour by using the `transform` options:

```js
'json-minify': {
  options: {
    transform: function (data, options) {
      return JSON5.stringify(JSON5.parse(data));
    }
  },
  build: {
    files: 'build/**/*.json'
  }
}
```

This example reconstructs the previous behavior before version 1.0.0. The `data` attribute is the json file content and the `options` are the current task options.

## License
Copyright (c) 2016 werk85
Licensed under the MIT license.
