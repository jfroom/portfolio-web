module.exports = {
  data:{
    options:{

    },
    files:[
      {
        expand: true,
        cwd: '.tmp',
        src: ['assets/data/*.json'],
        dest: '.tmp',
        ext: '.json'
      }
    ]
  },
  main: {
    options: {
      //mode: 'gzip'
    },

    files: [
      /*{

       expand: true,
       cwd: '.tmp',
       src: ['*.html'],
       dest: 'dist',
       ext: '.html'
       },*/

      /*,
      {
        expand: true,
        cwd: '.tmp',
        src: ['scripts/*.min.js'],
        dest: 'dist',
        ext: '.min.js'
      }, {
        expand: true,
        cwd: '.tmp',
        src: ['styles/css/*.min.css'],
        dest: 'dist',
        ext: '.min.css'
      }*/
    ]
  }
}
