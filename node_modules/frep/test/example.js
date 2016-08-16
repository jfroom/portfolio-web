const expect = require('chai').expect;
const frep = require('../');
const _str = require('underscore.string');
const _   = require('lodash');

/**
 * This is the example from the README.
 * Here it is setup as a Mocha test.
 */


// We'll use underscore string's slugify function for the first example


/**
 * Setup
 */

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

describe('when three different slugify functions are used, on three different patterns', function () {
  it('should slugify the strings and generate a new string from the given structure.', function () {
    var actual = frep.strWithArr(':foo/:bar/:baz', patterns);
    var expected = 'this-is-foo/this_is_bar_/THIS-is-BAZ-';
    expect(actual).to.eql(expected);
  });
});