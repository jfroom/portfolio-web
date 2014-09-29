module.exports = {
  options: {
    includePaths: ['.tmp-spritesheet/assets/spritesheet/']
  },
  development: {
    options: {
      sourcemap: true
    },
    files: {
      'app/styles/css/main.css': 'app/styles/scss/main.scss',
      'app/styles/css/blog.css': 'app/styles/scss/blog.scss'
    }
  },
  dist: {
    files: {
      '.tmp/styles/css/main.css': 'app/styles/scss/main.scss',
      '.tmp/styles/css/blog.css': 'app/styles/scss/blog.scss'
    }
  }
}
