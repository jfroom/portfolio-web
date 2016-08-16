/**
 * Sellside
 *
 * Sellside <http://www.sellside>
 * Created and maintained by Jon Schlinkert and Brian Woodward
 *
 * Copyright (c) 2013 Sellside.
 * Licensed under the MIT License (MIT).
 */

var expect = require('chai').expect;

var strings = require('../');

describe('middleware', function() {

  describe('paths', function() {

    var filePath = '/path/to/foo.html';
    var structure = null;
    before(function(){
      strings();
      structure = strings.instance().use(strings.paths(filePath));
    });
  
    it('should replace :basename', function() {
      var expected = 'foo';
      var actual = structure.run(':basename');
      expect(actual).to.eql(expected);
    });

    it('should replace :filename', function() {
      var expected = 'foo.html';
      var actual = structure.run(':filename');
      expect(actual).to.eql(expected);
    });

    it('should replace :ext', function() {
      var expected = '.html';
      var actual = structure.run(':ext');
      expect(actual).to.eql(expected);
    });

    it('should replace dir', function() {
      var expected = '/path/to';
      var actual = structure.run(':dir');
      expect(actual).to.eql(expected);
    });
  
  });

  describe('paths-slugify', function() {
  
    var filePath = '/path_with/slugs_to/foo_bar.html';
    var structure = null;
    before(function() {
      strings();
      structure = strings.instance().use(strings.paths(filePath, { slugify: true }));
    });

    it('should replace :basename and slugify', function() {
      var expected = 'foo-bar';
      var actual = structure.run(':basename');
      expect(actual).to.eql(expected);
    });

    it('should replace :filename and slugify', function() {
      var expected = 'foo-barhtml';
      var actual = structure.run(':filename');
      expect(actual).to.eql(expected);
    });

    it('should replace :ext and slugify', function() {
      var expected = 'html';
      var actual = structure.run(':ext');
      expect(actual).to.eql(expected);
    });

    it('should replace :dir and slugify', function() {
      var expected = 'path-withslugs-to';
      var actual = structure.run(':dir');
      expect(actual).to.eql(expected);
    });
  
  });

});