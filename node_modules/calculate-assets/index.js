/**
 * Calculate the path to an 'assets' or 'public' directory from
 * dest files. Since this path maybe used in templates, whether
 * or not the path should have a trailing slash is significant,
 * making this is a different challenge than just calculating a
 * relative path.
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors
 * Licensed under the MIT License (MIT).
 */

const relative = require('relative');
const file = require('fs-utils');

module.exports = function(dest, assets) {
  var assetsOrig = assets;
  // `options.assets` generate the relative path to the dest "assets"
  // directory from the location of the newly generated dest file
  assets = relative(dest, assets);

  // if the assets relative path is empty, then it's the same
  // directory so update to be '.'
  if (!assets || assets.length === 0) {
    assets = '.';
  }

  // if the originally defined assets path had a trailing slash,
  // make sure it has one
  if (file.endsWith(assetsOrig, '/')) {
    assets = file.addTrailingSlash(assets);

    // if the originally defined assets path did not have a
    // trailing slash, make sure it doesn't have one.
  } else if (!file.endsWith(assetsOrig, '/')) {
    assets = file.removeTrailingSlash(assets);
  }
  return file.normalizeSlash(assets);
};