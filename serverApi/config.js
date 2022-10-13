const path = require('path');

const rootPath = __dirname;

module.exports = {
  rootPath,
  uploadPath: path.join(rootPath, 'public/uploads'),
  mongo: {
    db: 'mongodb://localhost/myMusic',
    options: {useNewUrlParser: true}
  },
  facebook: {
    appId: '508453120803839',
    appSecret: process.env.FACEBOOK_APP_SECRET
  }
};