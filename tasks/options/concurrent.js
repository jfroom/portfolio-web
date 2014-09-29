module.exports = {
  server: [
    //'compass',
    'coffee:dist' //,
    //'copy:styles'
  ],
  test: [
    'coffee' //,
    //'copy:styles'
  ],
  dist: [
    'coffee:dist',
    'sass:dist'
    //'compass',
    //'copy:styles',
    //'imagemin',
    //'svgmin',
    //'htmlmin'
    //,'htmlcompressor'
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
    //'copy:jsVendor'

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
  ],
  protractor:{

    options: {
      limit:2,
      logConcurrentOutput:true
    },
    tasks: [
      'protractor:e2e_sauce_sl_chrome_linux'
      ,'protractor:e2e_sauce_sl_firefox_linux'
      ,'protractor:e2e_sauce_sl_chrome_win8'
      //'protractor:e2e_sauce_sl_safari_ios6_1'
      //'protractor:e2e_sauce_sl_android4'
    ]

  }
};
