module.exports = {
  options: {
    jshintrc: '.jshintrc'
  },
  all: [
    'Gruntfile.js',
    'app/scripts/{,*/}*.js',
    '!app/scripts/vendor/*',
    'test/spec/{,*/}*.js'
  ]
};