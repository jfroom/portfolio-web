'use strict';

var utils = require('../../utils');
var cache;

module.exports = function(val, key, config, schema) {
  if (cache) {
    schema.data.set('git', cache);
    return cache;
  }

  if (!utils.isObject(val)) {
    cache = tryGitConfig(process.cwd())
      || tryGitConfig({path: utils.resolveDir('~/.gitconfig')})
      || tryGitConfig({path: utils.resolveDir('~/.config/git/config')});

    if (cache) {
      schema.data.set('git', cache);
      return cache;
    }
  }
};

function tryGitConfig(options) {
  try {
    var git = utils.parseGitConfig.sync(options);
    if (git.user) return parseKeys(git);
  } catch (err) {}
}

function parseKeys(git) {
  var obj = utils.parseGitConfig.keys(git);
  utils.merge(git, obj);
  return git;
}
