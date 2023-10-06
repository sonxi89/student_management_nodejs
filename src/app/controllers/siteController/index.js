const upload = require('./upload');

class siteController {
  async upload(req, res, next) {
    await upload(req, res, next);
  }
}

module.exports = new siteController();
