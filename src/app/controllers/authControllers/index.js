const register = require('./register');
const login = require('./login');

class authController {
  async register(req, res, next) {
    await register(req, res, next);
  }

  async login(req, res, next) {
    await login(req, res, next);
  }
}

module.exports = new authController();
