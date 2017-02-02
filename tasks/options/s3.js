module.exports = {
  options: {
    accessKeyId: "<%= process.env['S3_PORTFOLIO_KEY'] %>",
    secretAccessKey: "<%= process.env['S3_PORTFOLIO_SECRET'] %>",
    bucket: "<%= process.env['S3_PORTFOLIO_BUCKET'] %>",
    region: "<%= process.env['S3_PORTFOLIO_REGION'] %>",
    access: 'public-read',
    //cache: false, // set to false to force overwrite uploads
    //dryRun: true // set to true to see logging of what will happen, but not actually upload

  },

  dist: {
    cwd: 'dist',
    src: '**',
    dest: "<%= process.env['S3_PORTFOLIO_PATH'] %>",
  }

};
