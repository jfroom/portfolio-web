module.exports = {
  options: {
    compile: true
  },
  bootstrap: {
    files:{
      './app/styles/css/less.main.css':'./app/styles/less/less-main.less'
      //'my.css':'my.less'
    }
  }
  /*,min: {
   options: {
   compress: true
   },
   src: ['app/styles/less/less-main.less'],
   dest: 'app/styles/css/less-main.min.css'
   }

   theme: {
   src: ['less/theme.less'],
   dest: 'dist/css/<%= pkg.name %>-theme.css'
   },
   theme_min: {
   options: {
   compress: true
   },
   src: ['less/theme.less'],
   dest: 'dist/css/<%= pkg.name %>-theme.min.css'
   }*/
}