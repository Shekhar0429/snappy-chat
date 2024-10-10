const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
  console.log(req.cookies);
  const token = req.cookies.jwt;
  if (!token)
    return res.status(401).json({
      status: 'Failed',
      message: 'You are not authenticated',
    });
  jwt.verify(token, process.env.JWT_KEY, async (err, payload) => {
    if (err)
      return res.status(403).json({
        status: 'failed',
        message: 'Token is not valid',
      });
    req.userId = payload.id;
    next();
  });
};
