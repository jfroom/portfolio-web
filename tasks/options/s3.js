var grunt = require("grunt");
//var aws = grunt.file.readJSON('./private/credentials/aws.json');

module.exports = {
  options: {
    debug: false,
    key: process.env["S3_PORTFOLIO_KEY"],
    secret: process.env["S3_PORTFOLIO_SECRET"],
    bucket: process.env["S3_PORTFOLIO_BUCKET"],
    region: process.env["S3_PORTFOLIO_REGION"],
    access: 'public-read',
    headers: {
      // Two Year cache policy (1000 * 60 * 60 * 24 * 730) = 630720000
      // one day 86400
      "Cache-Control": "max-age=86400, public, must-revalidate",
      "Expires": new Date(Date.now() + 86400).toUTCString()
    },
    //encodePaths: true,
    maxOperations: 20,
    gzip: true,
    gzipExclude: ['.jpg', '.jpeg', '.png', '.swf', '.mp4', '.ogg', '.webm']
  },
  upload: {
    // These options override the defaults
    options: {


    },
    // Files to be uploaded.

    //upload: [{
    //  src: 'blob/**/*',
    //  dest: 'blob',
    //  rel: 'blob',
    //  access: 'authenticated-read'
    //}],

    upload: [{
      // make sure this document is newer than the one on S3 and replace it
      src: 'dist/**/*',
      dest: process.env.S3_PORTFOLIO_PATH,
      options: {

      },
      rel: 'dist',
      verify: false
    }]
  },
  sync: {
      sync:[{
          src: 'dist/**/*',
          dest: '',
          rel: 'dist'
      }]
  }

}
