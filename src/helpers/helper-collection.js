module.exports.register = function(Handlebars, options, params) {
  "use strict";

  //http://stackoverflow.com/questions/16535105/comma-separate-string-using-handlebars-js
  Handlebars.registerHelper('commalist', function(items, options) {
    var out = '';

    for(var i=0, l=items.length; i<l; i++) {
      out = out + options.fn(items[i]) + (i!==(l-1) ? ", ":"");
    }
    return out;
  });


}
