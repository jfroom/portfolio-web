//require("grunt").log.writeln("watch.js process.env[LIVERELOAD_PORT;] " + process.env["LIVERELOAD_PORT"])
module.exports = {
  options:{
      livereload: true//process.env["LIVERELOAD_PORT"]
    },
  gruntfile: {
    files: ['Gruntfile.js', 'tasks/**/*.js'],
    tasks: ['watchcontexthelper:gruntfile'],
    options: {
      nospawn: true
    }
  },
  coffee: {
    files: ['app/scripts/{,**/}*.coffee'],
    tasks: ['clean:js', 'coffee:dist']
  },
  coffeeTest: {
    files: ['test/spec/{,*/}*.coffee'],
    tasks: ['coffee:test']
  },
  livereload: {
    files: [
      'app/templates/pages/*.hbs',
      'app/templates/layouts/*.hbs',
      'app/templates/partials/*.hbs',
      //'.tmp/*.html',
      //'{.tmp,app}/styles/css/{,*/}*.css',
      //'{.tmp,app}/scripts/{,*/}*.js',
      'app/assets/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
      'app/assets/data/*.json',
      "src/helpers/*.js",
      process.env.PATH_PORTFOLIO_DATA + "*.json"

    ],
    tasks: ['copy:data', 'json-minify:data', 'assemble:development']
  },
  blog: {
    files: [
      'app/templates/blog/**/*.hbs',
      process.env.PATH_BLOG_POSTS_PATH + "**/*.hbs",
      "src/helpers/*.js"
    ],
    tasks: ['assemble:blog_development']
  },
  sass: {
    files: ['app/styles/scss/{,*/}*.{scss,sass}'],
    tasks: ['watchcontexthelper:sass'],
    options: {
      nospawn: true
    }
  },
  recess: {
    files: 'app/styles/less/*.less',
    tasks: ['recess']
  },
  js: {
    files: ['app/scripts/{,*/}*.js'],
    tasks: ['watchcontexthelper:js'],
    options: {
      nospawn: true
    }
  },
  img: {
    files: ['app/assets/images/**/*'],
    tasks: ['watchcontexthelper:img'],
    options: {
      nospawn: true
    }
  },
  html: {
    files: [
      'app/templates/**/*.hbs',
      "src/helpers/*.js"
    ],
    tasks: ['assemble:development', 'assemble:blog_development', 'watchcontexthelper:html'],
    options: {
      nospawn: true
    }
  }
};

