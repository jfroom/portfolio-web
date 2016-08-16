'use strict';

var git = require('./git');

module.exports = function(val, key, config, schema) {
  var owner = schema.data.get('owner');
  if (owner) {
    return owner;
  }

  var repo = config.repository;
  if (typeof repo === 'string') {
    var segs = repo.split('/');
    owner = segs.shift();
    schema.data.set('owner', owner);
    return owner;
  }

  var parsed = git(val, key, config, schema);
  if (parsed) {
    schema.data.set('git', parsed);
    owner = parsed.user && parsed.user.name;
    if (owner) {
      schema.data.set('owner', owner);
      return owner;
    }
  }
  return null;
};
