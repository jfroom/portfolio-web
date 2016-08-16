/**
 * Sellside
 *
 * Sellside <http://www.sellside.com>
 * Created and maintained by Jon Schlinkert and Brian Woodward
 *
 * Copyright (c) 2013 Sellside.
 * Licensed under the MIT License (MIT).
 */

var utils = module.exports = {};

utils.create = function(args) {
  var obj = args[0];
  args = args.splice(1);
  function F() {
    return obj.apply(this, args);
  };
  F.prototype = obj.prototype;
  return new F();
};

utils.logging = false;
utils.log = function() {
  if(this.logging) {
    console.log.apply(this, Array.prototype.slice.call(arguments))
  }
};
