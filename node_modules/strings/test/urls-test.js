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

  describe('urls', function() {

    var url = 'https://github.com/sellside/strings.git?sortby=name';
    var structure = null;
    before(function(){
      strings();
      structure = strings.instance().use(strings.urls(url));
    });
  
    it('should replace :protocol', function() {
      var expected = 'https:';
      var actual = structure.run(':protocol');
      expect(actual).to.eql(expected);
    });

  });

  describe('urls-slugify', function() {
  
    var filePath = '/path_with/slugs_to/foo_bar.html';
    var url = 'h.ttps://github.com/sellside/strings.git?sortby=name';
    var structure = null;
    before(function() {
      strings();
      structure = strings.instance().use(strings.urls(url, { slugify: true }));
    });

    it('should replace :protocol and slugify', function() {
      var expected = 'https';
      var actual = structure.run(':protocol');
      expect(actual).to.eql(expected);
    });

  });

});