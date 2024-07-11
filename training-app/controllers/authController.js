const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const { registerValidation, loginValidation } = require('../utils/validators');
const { sendEmail } = require('../services/emailService');

exports.register = async (req, res, next) => {
  try {
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.create(req.body);

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });

    
    await sendEmail(user.email, 'Confirm your registration', 'confirmRegistration', { user });

    res.status(201).json({ status: 'success', token, data: { user } });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({ email: req.body.email }).select('+password');
    if (!user || !(await user.correctPassword(req.body.password, user.password))) {
      return res.status(401).send('Incorrect email or password');
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
    res.status(200).json({ status: 'success', token, data: { user } });
  } catch (err) {
    next(err);
  }
};
