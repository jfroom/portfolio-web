module.exports = {
  tmp: ['.tmp', '.sass-cache'],
  dist: ['dist', '.sass-cache'],
  js: ['{dist/scripts,.tmp}/scripts'],
  css: ['{dist/styles/css,.tmp}/styles/css', '.sass-cache'],
  html: ['{dist/*.html,.tmp}/*.html'],
  img: ['{dist/assets/images,.tmp}/assets/images'],
  spritesheet: ['.tmp-spritesheet'],
  //devjs: ['dist/js/**/*.js', '!dist/js/**/*.min.js'],
  devcss: ['styles'],
  options: {
    //force: true
  }
}
