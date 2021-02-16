const Router = require('koa-router');
const authCtrl = require('./api/auth-ctrl');

const handler = new Router();

handler.post('/login', authCtrl.login);
handler.post('/logout', authCtrl.logout);

module.exports = handler;
