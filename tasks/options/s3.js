module.exports = {
  options: {
    accessKeyId: "<%= process.env['S3_PORTFOLIO_KEY'] %>",
    secretAccessKey: "<%= process.env['S3_PORTFOLIO_SECRET'] %>",
    region: "<%= process.env['S3_PORTFOLIO_REGION'] %>",
    access: "<%= process.env['S3_PORTFOLIO_ACCESS'] %>",
    gzip: true,
    cache: false, 
    overwrite: true,
    //dryRun: true // set to true to see logging of what will happen, but not actually upload
  },

  dist: {
    cwd: 'dist',
    src: ['**', '!index.html'],
    dest: "<%= process.env['S3_PORTFOLIO_PATH'] %>",
    options: {
      bucket: "<%= process.env['S3_PORTFOLIO_BUCKET'] %>",
    }

  },

  index_page: {
    cwd: 'dist',
    src: 'index.html',
    dest: "<%= process.env['S3_PORTFOLIO_PATH'] %>",
    options: {
      bucket: "<%= process.env['S3_PORTFOLIO_INDEX_BUCKET'] %>",
    }
  }

};
