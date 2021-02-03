const Router = require('koa-router');
const authCtrl = require('./api/auth-ctrl');

const handler = new Router();

handler.post('/register', authCtrl.register);
handler.post('/login', authCtrl.login);
handler.get('/auth-check', authCtrl.check);
handler.post('/logout', authCtrl.logout);

module.exports = handler;
