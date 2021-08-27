const HttpError = require('../models/http-error');
const jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
  try {
    const token = res.headers.authorization.split(' ')[1];
    if (!token) {
      throw new HttpError('Authentication failed', 401);
    }
    const decodedtoken = jwt.verify(
      token,
      'ssuuppeerrsseeccrreettdonotshareit'
    );
    req.userData = { userId: decodedtoken.userId };
    next();
  } catch (err) {
    const err = new HttpError('Authentication failed or try logging in again', 401);
    return next(err);
  }
};
