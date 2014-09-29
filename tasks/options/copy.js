
module.exports = {
  development:{

  },
  jsVendor: {
    files: [{
      expand: true,
      cwd: 'app/scripts/vendor/',
      src: '*',
      dest: '.tmp/scripts/vendor/',
      filter: 'isFile'
    }]
  },

  dev_bowerComponents: {
    files:[
      {'./.tmp/': 'bower_components/angular/*{.js,.map}'},
      {'./.tmp/': 'bower_components/jquery/*{.js,.map}'},
      {'./.tmp/': 'bower_components/store-js/store.js'},
      {'./.tmp/': 'bower_components/fastclick/lib/*{.js,.map}'},
      {'./.tmp/': 'bower_components/firebase/*{.js,.map}'},
      {'./.tmp/': 'bower_components/angular-route/*{.js,.map}'},
      {'./.tmp/': 'bower_components/angular-resource/*{.js,.map}'},
      {'./.tmp/': 'bower_components/angular-sanitize/*{.js,.map}'},
      {'./.tmp/': 'bower_components/showdown/compressed/showdown.js'},
      {'./.tmp/': 'bower_components/bootstrap-sass/assets/js/*{.js,.map}'},
      //{'./.tmp/': 'bower_components/bootstrap-sass/js/scrollspy.js'},
      {'./.tmp/': 'bower_components/font-awesome/fonts/*'},
      {'./.tmp/': 'bower_components/lodash/dist/lodash.min{.js,.map}'},
      {'./.tmp/': 'bower_components/log4javascript/log4javascript{.js,.map}'},
      {'./.tmp/': 'bower_components/moment/*{.js,.map}'},
      {'./.tmp/': 'bower_components/angular-moment/*{.js,.map}'}

    ]
  },
  bowerComponents: {
    files:[
      {'./dist/': 'bower_components/font-awesome/fonts/*'},
      {'./dist/': 'bower_components/bootstrap-sass/assets/js/html5shiv.js'},
      {'./dist/': 'bower_components/bootstrap-sass/assets/js/respond.min.js'}
    ]
  },
  jsApp: {
    files: [{
      expand: true,
      cwd: '.tmp/scripts/',
      src: '*.min.js',
      dest: 'dist/scripts/',
      filter: 'isFile'
    }]
  },
  dev_jsApp: {
    files: [{
      expand: true,
      cwd: 'app/scripts/',
      src: '**/*.coffee',
      dest: '.tmp/scripts/',
      filter: 'isFile'
    }]
  },
  dev_spritesheet: {
    files: [
      //{ '.tmp/assets/images/sprites/*.png': '.tmp/node-spritesheet/*.png'},
      //{ '.tmp/assets/images/sprites/': '.tmp/node-spritesheet/*.png'}
    ]
  },
  spritesheet: {
    files: [{
      expand: true,
      cwd: '.tmp-spritesheet/',
      src: '**/*.{png,jpg,jpeg,gif,svg}',
      dest: 'dist'
    }]
  },
  img: {
    files: [{
      expand: true,
      cwd: 'app/assets/images/util/',
      src: '**/*.{png,jpg,jpeg,gif,svg}',
      dest: 'dist/assets/images/util'
    }
    ]
  },
  feed:{
    files: [{
      expand: true,
      cwd: process.env.PATH_BLOG_FEED_PATH,
      src: '*.{xml,rss}',
      dest: 'dist/feed'
    }]
  },

  html: {
    files: [{
      expand: true,
      cwd: 'app/html/pages/',
      src: '**/*.html',
      dest: 'dist/html/'
    }]
  },

  styles: {
    files: [{
      expand: true,
      dot: true,
      cwd: '.tmp/styles/css/',
      dest: 'dist/styles/css/',
      src: '{,*/}*.min.css'
    }]
  },
  xcomponents: {
    files: [{
      expand: true,
      cwd: 'app/bower_components/',
      src: '**/*',
      dest: 'dist/bower_components/',
      filter: 'isFile'
    }]
  },
  data: {
    files: [
      {
        expand: true,
        cwd: 'app/assets/data/',
        src: '**/*',
        dest: '.tmp/assets/data/',
        filter: 'isFile'
      },
      {
        expand: true,
        cwd: process.env.PATH_PORTFOLIO_DATA,
        src: '**/*',
        dest: '.tmp/assets/data/',
        filter: 'isFile'
      }
    ]
  }
};
