const User = require('../models/user');
/*
  POST /api/auth/login
  {
    userId: 'captionuser',
    password: 'mypass123'
  }
*/
exports.login = async (ctx) => {
  const { userId, password } = ctx.request.body;

  if (!userId || !password) {
    ctx.status = 401; // Unauthorized
    return;
  }

  try {
    const user = await User.findOne({ userId: userId });
    if (!user) {
      ctx.status = 401;
      return;
    }
    const valid = await user.checkPassword(password);
    if (!valid) {
      ctx.status = 401;
      return;
    }
    if(user.usertype !== 'ADMIN'){
      ctx.status = 401;
      return;
    }
    ctx.body = user.serialize();
    const token = user.generateToken();
    ctx.cookies.set('access_token', token, {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7days
      httpOnly: true, //Kim: Very Important!:
      // The httpOnly: true setting means that the cookie can’t be read using JavaScript 
      // but can still be sent back to the server in HTTP requests.
    });
  } catch (e) {
    ctx.throw(500, e);
  }
};

/*
  POST /api/auth/logout
*/
exports.logout = async (ctx) => {
  ctx.cookies.set('access_token');
  ctx.status = 204; // No Content
};
