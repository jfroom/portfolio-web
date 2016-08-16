/**
 * Strings <https://github.com/sellside/strings>
 *
 * Copyright (c) 2014 Sellside, Jon Schlinkert and Brian Woodward
 * Licensed under the MIT License (MIT).
 */

'use strict';

var _s = require('underscore.string');
var moment = require('moment');

var Pattern = require('../pattern');

var slugified = function(str, slugify) {
  return slugify ? _s.slugify(str) : str;
};

var format = function(d, options) {
  moment.lang(options.lang);
  return function(f) {
    return moment(d).format(f);
  };
};

var dates = module.exports = function(d, options) {

  options = options || { slugify: false };
  var slugify = ((typeof options.slugify === 'undefined') || options.slugify === false) ? false : true;
  options.lang = options.lang || 'en';

  var formatter = format(d, options);

  /**
   * Date patterns
   */

  var datePatterns = {
    // Full date
    'date': new Pattern(/:\bdate\b/,            slugified(formatter("YYYY/MM/DD"), slugify)),

    // Long date formats
    'L': new Pattern(/:\bL\b/,                  slugified(formatter("MM/DD/YYYY"), slugify)),
    '1': new Pattern(/:\b1\b/,                  slugified(formatter("M/D/YYYY"), slugify)),

    // Year (2013, 13)
    'year': new Pattern(/:\byear\b/,            slugified(formatter("YYYY"), slugify)),
    'YYYY': new Pattern(/:\bYYYY\b/,            slugified(formatter("YYYY"), slugify)),
    'YY': new Pattern(/:\bYY\b/,                slugified(formatter("YY"), slugify)),

    // Month name (January, Jan)
    'monthname': new Pattern(/:\bmonthname\b/,  slugified(formatter("MMMM"), slugify)),
    'MMMM': new Pattern(/:\bMMMM\b/,            slugified(formatter("MMMM"), slugify)),
    'MMM': new Pattern(/:\bMMM\b/,              slugified(formatter("MMM"), slugify)),

    // Month number (1, 01)
    'month': new Pattern(/:\bmonth\b/,          slugified(formatter("MM"), slugify)),
    'MM': new Pattern(/:\bMM\b/,                slugified(formatter("MM"), slugify)),
    'mo': new Pattern(/:\bmo\b/,                slugified(formatter("MM"), slugify)),
    'M': new Pattern(/:\bM\b/,                  slugified(formatter("M"), slugify)),

    // Day of the year
    'DDDD': new Pattern(/:\bDDDD\b/,            slugified(formatter("DDDD"), slugify)),
    'DDD': new Pattern(/:\bDDD\b/,              slugified(formatter("DDD"), slugify)),

    // Day of the month
    'day': new Pattern(/:\bday\b/,              slugified(formatter("DD"), slugify)),
    'DD': new Pattern(/:\bDD\b/,                slugified(formatter("DD"), slugify)),
    'D': new Pattern(/:\bD\b/,                  slugified(formatter("D"), slugify)),

    // Day of the week (wednesday/wed)
    'dddd': new Pattern(/:\bdddd\b/,            slugified(formatter("dddd"), slugify)),
    'ddd': new Pattern(/:\bddd\b/,              slugified(formatter("ddd"), slugify)),
    'dd': new Pattern(/:\bdd\b/,                slugified(formatter("dd"), slugify)),
    'd': new Pattern(/:\bd\b/,                  slugified(formatter("d"), slugify)),

    // Hour
    'hour': new Pattern(/:\bhour\b/,            slugified(formatter("HH"), slugify)),
    'HH': new Pattern(/:\bHH\b/,                slugified(formatter("HH"), slugify)),
    'H': new Pattern(/:\bH\b/,                  slugified(formatter("H"), slugify)),
    'hh': new Pattern(/:\bhh\b/,                slugified(formatter("hh"), slugify)),
    'h': new Pattern(/:\bh\b/,                  slugified(formatter("h"), slugify)),

    // Minute
    'minute': new Pattern(/:\bminute\b/,        slugified(formatter("mm"), slugify)),
    'min': new Pattern(/:\bmin\b/,              slugified(formatter("mm"), slugify)),
    'mm': new Pattern(/:\bmm\b/,                slugified(formatter("mm"), slugify)),
    'm': new Pattern(/:\bm\b/,                  slugified(formatter("m"), slugify)),

    // Second
    'second': new Pattern(/:\bsecond\b/,        slugified(formatter("ss"), slugify)),
    'sec': new Pattern(/:\bsec\b/,              slugified(formatter("ss"), slugify)),
    'ss': new Pattern(/:\bss\b/,                slugified(formatter("ss"), slugify)),
    's': new Pattern(/:\bs\b/,                  slugified(formatter("s"), slugify)),

    // AM/PM, am/pm
    'A': new Pattern(/:\bA\b/,                  slugified(formatter("A"), slugify)),
    'a': new Pattern(/:\ba\b/,                  slugified(formatter("a"), slugify)),
    'P': new Pattern(/:\bP\b/,                  slugified(formatter("P"), slugify)),
    'p': new Pattern(/:\bp\b/,                  slugified(formatter("p"), slugify))
  };


  return function() {
    return datePatterns;
  };
};