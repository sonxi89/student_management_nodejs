const bcrypt = require('bcryptjs');
const db = require('../../../db/models/index');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate user input
    if (!(username && password)) {
      res.status(400).send('All input is required');
    }

    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await db.User.findOne({ username });

    if (oldUser) {
      return res.status(409).send('User Already Exist. Please Login');
    }

    //Encrypt user password
    encryptedPassword = await bcrypt.hash(password, 10);

    // Create user in our database
    const user = await db.User.create({
      username,
      password: encryptedPassword,
    });

    // Create token
    const token = jwt.sign({ username: user.username }, 'your-secret-key');
    // save user token

    // return new user
    res.status(201).json({ token });
  } catch (err) {
    console.log(err);
  }
};

module.exports = register;
