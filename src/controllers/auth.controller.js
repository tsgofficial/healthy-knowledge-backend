const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../models');

const Users = db.users;

// const SALT_ROUNDS = 10;

const register = async (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  if (!firstname || !lastname || !email || !password) {
    return res.status(400).send({
      success: false,
      message: 'firstname, lastname, email and password are required',
    });
  }

  const existing = await Users.findOne({ where: { email } });
  if (existing) {
    return res.status(409).send({ success: false, message: 'Email already registered' });
  }

  const hashed = await bcrypt.hash(password, 10);
  const user = await Users.create({ firstname, lastname, email, password: hashed });

  const { password: _, ...userWithoutPassword } = user.get({ plain: true });
  const token = jwt.sign(userWithoutPassword, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  return res.status(201).send({
    success: true,
    message: 'Registration successful',
    data: { token, user: userWithoutPassword },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({
      success: false,
      message: 'email and password are required',
    });
  }

  const user = await Users.findOne({ where: { email } });
  if (!user) {
    return res.status(401).send({ success: false, message: 'Invalid email or password' });
  }

  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) {
    return res.status(401).send({
      success: false,
      message: 'Invalid email or password',
    });
  }

  const { password: _, ...userWithoutPassword } = user.get({ plain: true });

  const token = jwt.sign(userWithoutPassword, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  res.send({
    success: true,
    message: 'Login successful',
    data: { token, user: userWithoutPassword },
  });
};

module.exports = { register, login };
