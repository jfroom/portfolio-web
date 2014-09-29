module.exports = {
  dist: {
    options: {
      collapseWhitespace: true,
      removeComments: true,
      removeCommentsFromCDATA: true,
       // https://github.com/yeoman/grunt-usemin/issues/44
       //collapseWhitespace: true,
      /* collapseBooleanAttributes: true,
       removeAttributeQuotes: true,
       removeRedundantAttributes: true,
       useShortDoctype: true,
       removeEmptyAttributes: true,
       removeOptionalTags: true*/
    },
    files: [
    {
      //'dist/index.html':'.tmp/index.html'

      expand: true,
      cwd: '.tmp',
      src: '**/*.html',
      dest: 'dist'

  }
    ]
  }
}
