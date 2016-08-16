/**
 * Sellside
 *
 * Sellside <http://www.sellside.com>
 * Created and maintained by Jon Schlinkert and Brian Woodward
 *
 * Copyright (c) 2013 Sellside.
 * Licensed under the MIT License (MIT).
 */

var basename = require('path').basename;
var extname = require('path').extname;
var inspect = require('util').inspect;
var expect = require('chai').expect
var assert = require('chai').assert;
var _ = require('lodash');

var strings = require('../');

var pathMiddleware = function (path) {
  return function () {
    return {
      basename: basename(path, extname(path)),
      ext: extname(path)
    };
  };
};

var excludeMiddleware = function () {
  return ['ext'];
};

var testStructure = '/:basename/index:ext';


describe('strings', function () {

  describe('default', function() {
  
    it('should convert structure to string given an object', function() {
      var expected = '/file/index.html';
      var actual = strings(testStructure, {
        basename: 'file',
        ext: '.html'
      });
      expect(actual).to.eql(expected);
    });
  
  });

  describe('structure', function () {

    it('should save the structure', function () {
      strings(testStructure);
      var structure = strings.instance();
      expect(structure.structure).to.equal(testStructure);
    });

    it('should have an empty structure', function () {
      strings();
      var structure = strings.instance();
      expect(structure.structure).to.equal('');
    });

    it('should have an empty structure when options are passed in', function () {
      strings();
      var structure = strings.instance();
      expect(structure.structure).to.equal('');
    });

    it('should save the structure when options are passed in', function () {
      strings(testStructure);
      var structure = strings.instance();
      expect(structure.structure).to.equal(testStructure);
    });

  });

  describe('middleware', function () {

    it('should add middleware with use', function () {
      strings(testStructure);
      var structure = strings.instance();
      structure.use(pathMiddleware('path/to/some/file.html'));
      expect(structure.middleware.length).to.equal(1);
    });

    it('should add middleware with exclude', function () {
      strings(testStructure);
      var structure = strings.instance();
      structure.use(pathMiddleware('path/to/some/file.html'));
      structure.exclude(excludeMiddleware);
      expect(structure.middleware.length).to.equal(2);
    });

    it('should build context from middleware', function () {
      strings(testStructure);
      strings.use(pathMiddleware('path/to/some/file.html'));
      var expected = {
        basename: 'file',
        ext: '.html'
      };
      var actual = strings.context();
      expect(actual).to.eql(expected);
    });

    it('should build context from middleware with exclusions', function () {
      strings(testStructure);
      strings.use(pathMiddleware('path/to/some/file.html'));
      strings.exclude(excludeMiddleware);
      var expected = {
        basename: 'file'
      };
      var actual = strings.context();
      expect(actual).to.eql(expected);
    });

    it('should add middleware with use as object', function () {
      strings(testStructure);
      var structure = strings.instance();
      structure.use({
        foo: 'bar'
      });
      expect(structure.middleware.length).to.equal(1);
    });

    it('should add middleware with exclude as object', function () {
      strings(testStructure);
      var structure = strings.instance();
      structure.use(pathMiddleware('path/to/some/file.html'));
      structure.exclude({
        basename: ''
      });
      expect(structure.middleware.length).to.equal(2);
    });

    it('should add middlware with exclude as array', function () {
      strings(testStructure);
      var structure = strings.instance();
      structure.use(pathMiddleware('path/to/some/file.html'));
      structure.exclude(['basename']);
      expect(structure.middleware.length).to.equal(2);
    });


  });

  describe('run', function () {

    it('should build the final string with no exclusions', function () {
      strings(testStructure);
      strings.use(pathMiddleware('path/to/some/file.html'));
      var expected = '/file/index.html';
      var actual = strings.run();
      expect(actual).to.eql(expected);
    });

    it('should build the final string with exclusions', function () {
      strings(testStructure);
      strings.use(pathMiddleware('path/to/some/file.html'));
      strings.exclude(excludeMiddleware);

      var expected = '/file/index:ext';
      var actual = strings.run();
      expect(actual).to.eql(expected);
    });

    it('should build the final string from a one time setup', function () {
      strings();
      strings.use(pathMiddleware('path/to/some/file.html'));

      var expected = 'file';
      var actual = strings.run(':basename');
      expect(actual).to.eql(expected);

      expected = '.html';
      actual = strings.run(':ext');
      expect(actual).to.eql(expected);
    });

    it('should run replacement functions with `context` as `this`', function () {
      strings();
      strings.use(pathMiddleware('path/to/some/file.html'));
      strings.use(function () {
        return [
          new strings.Pattern(':BASENAME', function (src) {
            //console.log(this);
            return this.basename.toUpperCase();
          })
        ];
      });

      var expected = 'file-FILE';
      var actual = strings.run(':basename-:BASENAME');
      expect(actual).to.eql(expected);

    })

  });

});