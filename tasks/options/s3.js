module.exports = {
  options: {
    accessKeyId: "<%= process.env['S3_PORTFOLIO_KEY'] %>",
    secretAccessKey: "<%= process.env['S3_PORTFOLIO_SECRET'] %>",
    bucket: "<%= process.env['S3_PORTFOLIO_BUCKET'] %>",
    region: "<%= process.env['S3_PORTFOLIO_REGION'] %>",
    access: 'public-read',
  },

  dist: {
    cwd: 'dist',
    src: '**' //,
    //dest: process.env.S3_PORTFOLIO_PATH
  }

};
