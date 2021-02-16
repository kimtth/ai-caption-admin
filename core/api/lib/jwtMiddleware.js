const jwt = require('jsonwebtoken');
const User = require('../../models/user');

const jwtMiddleware = async (ctx, next) => {
  const token = ctx.cookies.get('access_token');
  if (!token) return next(); // no token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // kim: re-issuing a token if the expiration of the period is less than 2.5 days. 
    const now = Math.floor(Date.now() / 1000);
    if (decoded.exp - now < 60 * 60 * 24 * 2.5) {
      const user = await User.findById(decoded.userId);
      const token = user.generateToken();
      ctx.cookies.set('access_token', token, {
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
        httpOnly: true,
      });
    }

    return next();
  } catch (e) {
    return next();
  }
};

const jwtGetUser = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded.userId;
  } catch {
    return null;
  }
}

module.exports = {
  jwtGetUser, jwtMiddleware
}
