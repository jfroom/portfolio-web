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
var moment = require('moment');

var strings = require('../');

describe('middleware', function() {

  describe('dates', function() {

    var now = new Date();
    var formatter = function(f) {
      return moment(now).format(f);
    };

    var structure = null;
    before(function(){
      strings();
      structure = strings
        .instance()
        .use(strings.dates(now))
        .use(strings.paths('test/actual/structure_date/index.html'));
    });

    // YYYY/MM/DD
    it('should replace :date', function() {
      var expected = formatter("YYYY/MM/DD");
      var actual = structure.run(':date');
      expect(actual).to.eql(expected);
    });

    it('should replace :date and :ext', function() {
      var expected = formatter("YYYY/MM/DD") + '/index.html';
      var actual = structure.run(':date/index:ext');
      expect(actual).to.eql(expected);
    });

    // Long date formats
    // MM/DD/YYYY
    it('should replace :L', function() {
      var expected = formatter("MM/DD/YYYY");
      var actual = structure.run(':L');
      expect(actual).to.eql(expected);
    });

    // M/D/YYYY
    it('should replace :1', function() {
      var expected = formatter("M/D/YYYY");
      var actual = structure.run(':1');
      expect(actual).to.eql(expected);
    });

    // Year (2013, 13)
    //\b/,          slugified(formatter("YYYY"), slugify)),
    it('should replace :year', function() {
      var expected = formatter("YYYY");
      var actual = structure.run(':year');
      expect(actual).to.eql(expected);
    });

    //\b/,          slugified(formatter("YYYY"), slugify)),
    it('should replace :YYYY', function() {
      var expected = formatter("YYYY");
      var actual = structure.run(':YYYY');
      expect(actual).to.eql(expected);
    });

    //\b/,              slugified(formatter("YY"), slugify)),
    it('should replace :YY', function() {
      var expected = formatter("YY");
      var actual = structure.run(':YY');
      expect(actual).to.eql(expected);
    });

    // Month name (January, Jan)
    //\b/,slugified(formatter("MMMM"), slugify)),
    it('should replace :monthname', function() {
      var expected = formatter("MMMM");
      var actual = structure.run(':monthname');
      expect(actual).to.eql(expected);
    });

    //\b/,          slugified(formatter("MMMM"), slugify)),
    it('should replace :MMMM', function() {
      var expected = formatter("MMMM");
      var actual = structure.run(':MMMM');
      expect(actual).to.eql(expected);
    });

    //\b/,            slugified(formatter("MMM"), slugify)),
    it('should replace :MMM', function() {
      var expected = formatter("MMM");
      var actual = structure.run(':MMM');
      expect(actual).to.eql(expected);
    });

    // Month number (1, 01)
    //\b/,        slugified(formatter("MM"), slugify)),
    it('should replace :month', function() {
      var expected = formatter("MM");
      var actual = structure.run(':month');
      expect(actual).to.eql(expected);
    });

    //\b/,              slugified(formatter("MM"), slugify)),
    it('should replace :MM', function() {
      var expected = formatter("MM");
      var actual = structure.run(':MM');
      expect(actual).to.eql(expected);
    });

    //\b/,              slugified(formatter("MM"), slugify)),
    it('should replace :mo', function() {
      var expected = formatter("MM");
      var actual = structure.run(':mo');
      expect(actual).to.eql(expected);
    });

    //\b/,                slugified(formatter("M"), slugify)),
    it('should replace :M', function() {
      var expected = formatter("M");
      var actual = structure.run(':M');
      expect(actual).to.eql(expected);
    });

    // Day of the year
    //\b/,          slugified(formatter("DDDD"), slugify)),
    it('should replace :DDDD', function() {
      var expected = formatter("DDDD");
      var actual = structure.run(':DDDD');
      expect(actual).to.eql(expected);
    });

    //\b/,            slugified(formatter("DDD"), slugify)),
    it('should replace :DDD', function() {
      var expected = formatter("DDD");
      var actual = structure.run(':DDD');
      expect(actual).to.eql(expected);
    });

    // Day of the month
    //\b/,            slugified(formatter("DD"), slugify)),
    it('should replace :day', function() {
      var expected = formatter("DD");
      var actual = structure.run(':day');
      expect(actual).to.eql(expected);
    });

    //\b/,              slugified(formatter("DD"), slugify)),
    it('should replace :DD', function() {
      var expected = formatter("DD");
      var actual = structure.run(':DD');
      expect(actual).to.eql(expected);
    });

    //\b/,                slugified(formatter("D"), slugify)),
    it('should replace :D', function() {
      var expected = formatter("D");
      var actual = structure.run(':D');
      expect(actual).to.eql(expected);
    });

    // Day of the week (wednesday/wed)
    //\b/,          slugified(formatter("dddd"), slugify)),
    it('should replace :dddd', function() {
      var expected = formatter("dddd");
      var actual = structure.run(':dddd');
      expect(actual).to.eql(expected);
    });

    //\b/,            slugified(formatter("ddd"), slugify)),
    it('should replace :ddd', function() {
      var expected = formatter("ddd");
      var actual = structure.run(':ddd');
      expect(actual).to.eql(expected);
    });

    //\b/,              slugified(formatter("dd"), slugify)),
    it('should replace :dd', function() {
      var expected = formatter("dd");
      var actual = structure.run(':dd');
      expect(actual).to.eql(expected);
    });

    //\b/,                slugified(formatter("d"), slugify)),
    it('should replace :d', function() {
      var expected = formatter("d");
      var actual = structure.run(':d');
      expect(actual).to.eql(expected);
    });

    // Hour
    //\b/,          slugified(formatter("HH"), slugify)),
    it('should replace :hour', function() {
      var expected = formatter("HH");
      var actual = structure.run(':hour');
      expect(actual).to.eql(expected);
    });

    //\b/,              slugified(formatter("HH"), slugify)),
    it('should replace :HH', function() {
      var expected = formatter("HH");
      var actual = structure.run(':HH');
      expect(actual).to.eql(expected);
    });

    //\b/,                slugified(formatter("H"), slugify)),
    it('should replace :H', function() {
      var expected = formatter("H");
      var actual = structure.run(':H');
      expect(actual).to.eql(expected);
    });

    //\b/,              slugified(formatter("hh"), slugify)),
    it('should replace :hh', function() {
      var expected = formatter("hh");
      var actual = structure.run(':hh');
      expect(actual).to.eql(expected);
    });

    //\b/,                slugified(formatter("h"), slugify)),
    it('should replace :h', function() {
      var expected = formatter("h");
      var actual = structure.run(':h');
      expect(actual).to.eql(expected);
    });

    // Minute
    //\b/,      slugified(formatter("mm"), slugify)),
    it('should replace :minute', function() {
      var expected = formatter("mm");
      var actual = structure.run(':minute');
      expect(actual).to.eql(expected);
    });

    //\b/,            slugified(formatter("mm"), slugify)),
    it('should replace :min', function() {
      var expected = formatter("mm");
      var actual = structure.run(':min');
      expect(actual).to.eql(expected);
    });

    //\b/,              slugified(formatter("mm"), slugify)),
    it('should replace :mm', function() {
      var expected = formatter("mm");
      var actual = structure.run(':mm');
      expect(actual).to.eql(expected);
    });

    //\b/,                slugified(formatter("m"), slugify)),
    it('should replace :m', function() {
      var expected = formatter("m");
      var actual = structure.run(':m');
      expect(actual).to.eql(expected);
    });

    // Second
    //\b/,      slugified(formatter("ss"), slugify)),
    it('should replace :second', function() {
      var expected = formatter("ss");
      var actual = structure.run(':second');
      expect(actual).to.eql(expected);
    });

    //\b/,            slugified(formatter("ss"), slugify)),
    it('should replace :sec', function() {
      var expected = formatter("ss");
      var actual = structure.run(':sec');
      expect(actual).to.eql(expected);
    });

    //\b/,              slugified(formatter("ss"), slugify)),
    it('should replace :ss', function() {
      var expected = formatter("ss");
      var actual = structure.run(':ss');
      expect(actual).to.eql(expected);
    });

    //\b/,                slugified(formatter("s"), slugify)),
    it('should replace :s', function() {
      var expected = formatter("s");
      var actual = structure.run(':s');
      expect(actual).to.eql(expected);
    });

    // AM/PM, am/pm
    //\b/,                slugified(formatter("A"), slugify)),
    it('should replace :A', function() {
      var expected = formatter("A");
      var actual = structure.run(':A');
      expect(actual).to.eql(expected);
    });

    //\b/,                slugified(formatter("a"), slugify)),
    it('should replace :a', function() {
      var expected = formatter("a");
      var actual = structure.run(':a');
      expect(actual).to.eql(expected);
    });

    //\b/,                slugified(formatter("P"), slugify)),
    it('should replace :P', function() {
      var expected = formatter("P");
      var actual = structure.run(':P');
      expect(actual).to.eql(expected);
    });

    //\b/,                slugified(formatter("p"), slugify)),
    it('should replace :p', function() {
      var expected = formatter("p");
      var actual = structure.run(':p');
      expect(actual).to.eql(expected);
    });

  });

  describe('dates-slugify', function() {

    var now = new Date();
    var structure = null;
    before(function() {
      structure = strings().use(strings.dates(now, { slugify: true }));
    });

  });
});