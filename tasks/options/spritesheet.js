grunt = require('grunt');
OUT_BASE = '.tmp-spritesheet/assets/spritesheet/';
output = {
  legacy: 'icon-sprite.png',
  retina: 'icon-sprite__2x.png'
};

grunt.task.registerTask("spritesheet:prep", "Remove old output folder, make new one", function () {
  exists = grunt.file.exists(OUT_BASE)
  //console.log("prep exists? exists");
  if (exists) {
    grunt.file.delete(OUT_BASE);
    //console.log("prep del");
  }
  grunt.file.mkdir(OUT_BASE);
})

grunt.task.registerTask('spritesheet:force', ['spritesheet:prep', 'spritesheet:compile']);

doesExist = grunt.file.exists(OUT_BASE + output.legacy) && grunt.file.exists(OUT_BASE + output.retina);
passiveList = [];

if (!doesExist) passiveList = ['spritesheet:prep', 'spritesheet:compile'];
//console.log("passiveList:" + passiveList + " output.legacy:" + OUT_BASE + output.legacy);
grunt.task.registerTask('spritesheet:passive', passiveList);


// NEVER start output path with './' - node-spritesheet will silently fail and kill the grunt task queue
module.exports = {
    compile: {
      files: {
        '.': process.env.PATH_PORTFOLIO_SPRITE_IMAGE_SRC
      }
    },
    options: {
      // Compiles to bin/assets/stylesheets/flags.css
      outputCss: OUT_BASE + '_icon-sprite.scss',
      outputDirectory: OUT_BASE, //OUT_BASE, // + process.env.PATH_PORTFOLIO_SPRITE_IMAGE_TARGET,
      // Uses this compound selector in the css, e.g. '.flag.my-image {}'
      selector: '.sprite',
      //httpImagePath: "../../assets/images/sprites/icon-sprite.png",
      // Output configurations: in this instance to output two sprite sheets,
      // one for "legacy" (i.e. 72dpi, pixel ratio 1), and "retina" (x2).
      // These keys (legacy, retina) are completely arbitrary.
      output: {
        legacy: {
          pixelRatio: 1,
          outputImage: OUT_BASE + output.legacy,
          httpImagePath: '../../assets/spritesheet/icon-sprite.png'
        },
        // As the retina scheme has the highest pixel ratio, it will be
        // assumed that all images passed to the builder are for 'retina',
        // and will be downscaled for 'legacy'.
        retina: {
          pixelRatio: 2,
          outputImage: OUT_BASE + output.retina,
          httpImagePath: '../../assets/spritesheet/icon-sprite__2x.png'
        }
      }
    }
  };


