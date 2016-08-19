module.exports = {
  server: [
    'coffee:dist'
  ],
  test: [
    'coffee'
  ],
  dist: [
    'coffee:dist',
    'sass:dist'
  ],
  copy: [
    'copy:jsApp',
    'copy:styles',
    'copy:html',
    'copy:img',
    'copy:spritesheet',
    'copy:bowerComponents',
    'copy:data',
    'copy:feed'
  ],
  dev_copy:[
    'copy:dev_bowerComponents',
    'copy:dev_jsApp',
    'copy:dev_spritesheet',
    'copy:data',
    'copy:jsVendor'
  ],
  clean: [
    'clean:tmp',
    'clean:dist',
    'clean:js',
    'clean:css',
    'clean:html',
    'clean:img'
  ]
};
