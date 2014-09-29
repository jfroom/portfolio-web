module.exports = {
  compile: {
    options: {
      type: 'html',
      preserveServerScript: true,
      compressJs: true,
      compressCss: true,
      preserveComments:false,
      preserveLineBreaks:false
      /*collapseWhitespace: true
      removeCommentsFromCDATA: true,
       // https://github.com/yeoman/grunt-usemin/issues/44
       //collapseWhitespace: true,
       collapseBooleanAttributes: true,
       removeAttributeQuotes: true,
       removeRedundantAttributes: true,
       useShortDoctype: true,
       removeEmptyAttributes: true,
       removeOptionalTags: true*/
    },
    /*
    files: [{
      expand: true,
      cwd: 'dist',
      src: 'index.html',
      dest: 'temp/index.html'
    }],*/
    files: {
      'temp/index.html': 'dist/index.html'
    },


  }
}
