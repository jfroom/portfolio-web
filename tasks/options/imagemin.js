module.exports = {
  dist: {
    files: [{
      expand: true,
      cwd: 'app/assets/images',
      src: '{,*/}*.{png,jpg,jpeg}',
      dest: 'app/assets/images'
    }]
  }
  /*,
   sprite: {
   files: [{
   expand: true,
   cwd: 'app/assets/images/sprites',
   src: '*.{png,jpg,jpeg}',
   dest: '' //dist/assets/images'
   }]
   }*/
}