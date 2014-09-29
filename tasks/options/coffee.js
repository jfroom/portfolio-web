module.exports = {
  development: {
    options: {
      sourceMap: true,
      sourceRoot: ""
    },
    files: [{
      expand: true,
      cwd: 'app/scripts',
      src: '{,**/}*.coffee',
      dest: '.tmp/scripts',
      ext: '.js',
      flatten: false
    }]
  },
  dist: {
    options: {
      sourceMap: false,
      sourceRoot: ""
    },
    files: [{
      expand: true,
      cwd: 'app/scripts',
      src: '{,**/}*.coffee',
      dest: '.tmp/scripts',
      ext: '.js',
      flatten: false
    }],
  },
  test: {
    files: [{
      expand: true,
      cwd: 'test/spec',
      src: '{,**/}*.coffee',
      dest: '.tmp/spec',
      ext: '.js'
    }]
  }
}