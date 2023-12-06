const register = require('./register');
const login = require('./login');
const changePassword = require('./changePassword');

class authController {
  async register(req, res, next) {
    await register(req, res, next);
  }

  async login(req, res, next) {
    await login(req, res, next);
  }

  async changePassword(req, res, next) {
    await changePassword(req, res, next);
  }
}

module.exports = new authController();
