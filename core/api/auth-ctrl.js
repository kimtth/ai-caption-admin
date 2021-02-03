const Joi = require('joi');
const User = require('../models/user');

/*
  POST /api/auth/register
*/
exports.register = async (ctx) => {
  const schema = Joi.object().keys({
    userId: Joi.string().alphanum().min(3).max(20).required(),
    password: Joi.string().required(),
  });
  const result = schema.validate(ctx.request.body);
  if (result.error) {
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }

  const { userId, password } = ctx.request.body;
  try {
    const exists = await User.findByUserId(userId);
    if (exists) {
      ctx.status = 409; // Conflict
      return;
    }

    const user = new User({
      userId,
    });
    await user.setPassword(password); // 비밀번호 설정
    await user.save(); // 데이터베이스에 저장

    ctx.body = user.serialize();

    const token = user.generateToken();
    ctx.cookies.set('access_token', token, {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7일
      httpOnly: true,
    });
  } catch (e) {
    ctx.throw(500, e);
  }
};

/*
  POST /api/auth/login
  {
    userId: 'velopert',
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
    const user = await User.findByUserId(userId);
    if (!user) {
      ctx.status = 401;
      return;
    }
    const valid = await user.checkPassword(password);
    if (!valid) {
      ctx.status = 401;
      return;
    }
    ctx.body = user.serialize();
    const token = user.generateToken();
    ctx.cookies.set('access_token', token, {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7days
      httpOnly: true, //Kim: Very Important!
    });
  } catch (e) {
    ctx.throw(500, e);
  }
};

/*
  GET /api/auth/check
*/
exports.check = async (ctx) => {
  const { user } = ctx.state;
  if (!user) {
    ctx.status = 401; // Unauthorized
    return;
  }
  ctx.body = user;
};

/*
  POST /api/auth/logout
*/
exports.logout = async (ctx) => {
  ctx.cookies.set('access_token');
  ctx.status = 204; // No Content
};
