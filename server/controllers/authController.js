const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    httpOnly: true,
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
  };

  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;
  user.password = undefined;
  res.cookie('jwt', token, cookieOptions);

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user: user,
    },
  });
};

exports.signup = async (req, res, next) => {
  try {
    const { email, password, username } = req.body;
    if (!email || !password)
      return res.status(400).json({
        status: 'Email and password is required',
      });
    const user = await User.create({ username, email, password });
    signToken(user.id);
    console.log('user', user);
    createSendToken(user, 201, res);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'Internal server error',
    });
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({
      status: 'failed',
      message: 'please provide email and password!',
    });

  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password)))
    return res.status(401).json({
      status: 'failed',
      message: 'incorrect password or email',
    });

  createSendToken(user, 200, res);
};

exports.getUserInfo = async (req, res, next) => {
  try {
    console.log(req.userId);

    const userData = await User.findById(req.userId);
    if (!userData)
      return res.status(404).json({
        status: 'failed',
        message: 'User not found',
      });
    res.status(200).json({
      data: userData,
    });
  } catch (error) {}
};

exports.setAvatar = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const avatarImage = req.body.image;
    const userData = await User.findByIdAndUpdate(userId, {
      isAvatarImageSet: true,
      avatarImage,
    });
    return res.json({
      isSet: userData.isAvatarImageSet,
      image: userData.avatarImage,
    });
  } catch (error) {
    next(error);
  }
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({ _id: { $ne: req.params.id } }).select(['email', 'username', 'avatarImage', '_id']);
    return res.json(users);
  } catch (error) {
    next(error);
  }
};

exports.logout = (req, res) => {
  res.cookie('jwt','', {
    domain: 'localhost',
    expires: new Date(0),
    httpOnly: true,
    path: '/',
    secure: true,
    sameSite: 'strict',
  });
  res.status(200).json({ status: 'success' });
};