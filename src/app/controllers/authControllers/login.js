const bcrypt = require('bcryptjs');
const db = require('../../../db/models/index');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const login = async (req, res) => {
  try {
    // Get user input
    const { username, password } = req.body;

    if (!(username && password)) {
      res.status(400).send('Bạn chưa điền username hoặc password ');
    }
    // Validate if user exist in our database
    const user = await db.User.findOne({ username });
    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign({ username: user.username }, process.env.TOKEN_KEY);

      res.status(200).json({
        success: true,
        message: 'Student logged in successfully',
        userId: user.id,
        username,
        token,
      });
    }
    res.status(400).send('Đăng nhập không thành công');
  } catch (err) {
    console.log(err);
  }
};

module.exports = login;
