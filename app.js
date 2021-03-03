require('dotenv').config()
const env = process.env.NODE_ENV;
if (env !== "production") {
  require('dotenv').config({ path: `./.env.dev` })
}

const Koa = require('koa');
const Router = require('koa-router');
const BodyParser = require("koa-bodyparser");
const serve = require('koa-static');
const mount = require("koa-mount");
const mongoose = require('mongoose');
const cors = require('@koa/cors');
const api = require('./core');
const { typeDefs, resolvers } = require('./core/api/apollo-def');
const { dialogTypeDefs, dialogResolvers } = require('./core/api/apollo-dialog-defs')
const { ApolloServer, ApolloError } = require('apollo-server-koa');
const { jwtGetUser, jwtMiddleware } = require('./core/api/lib/jwtMiddleware');
const _ = require('lodash');

const corsOptionsDev = {
  origin: 'http://localhost:3000',
  credentials: true
};
const app = new Koa();
if (process.env.NODE_ENV !== 'production') {
  app.use(cors(corsOptionsDev));
} else {
  app.use(cors());
}
app.use(BodyParser()); //Kim: Bodyparser should be set before router.
app.use(jwtMiddleware);

const static_pages = new Koa();
static_pages.use(serve(__dirname + "/build")); //serve the build directory
app.use(mount("/", static_pages));
app.use(mount("/app/user", static_pages));
app.use(mount("/app/channel", static_pages));
app.use(mount("/app/message", static_pages));
app.use(mount("/app/speech", static_pages));
app.use(mount("/app/dashboard", static_pages));
app.use(mount("/app/settings", static_pages));
app.use(mount("/login", static_pages));
app.use(mount("/404", static_pages));
app.use(async (ctx, next) => {
  await next();
    if (ctx.status === 404) {
      ctx.redirect('/404')
    }
});

const router = new Router();
router.use('/api', api.routes());
app.use(router.routes()).use(router.allowedMethods());

let mongoUri = process.env.MONGO_ENDPOINT
let port = 80
if (process.env.NODE_ENV !== 'production') { //development
  port = 8081;
}

const apollo = new ApolloServer({
  typeDefs: [typeDefs, dialogTypeDefs],
  resolvers: _.merge({}, resolvers, dialogResolvers),
  context: ({ ctx }) => {
    const token = ctx.cookies.get('access_token');
    if (token) {
      const userId = jwtGetUser(token);
      if (!userId) throw new ApolloError('you must be logged in');
      return { userId };
    }
  },
  cors: false //already set by koa
});
app.use(apollo.getMiddleware());
const server = require('http').createServer(app.callback())

let dbName = process.env.DB_NAME;
server.listen(port, () => {
  console.log(`Listening on (Web) ${port}`)
  //Kim: useCreateIndex: true: Prevent DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead.
  //Kim: DeprecationWarning: Mongoose: `findOneAndUpdate()` and `findOneAndDelete()` without the `useFindAndModify` option set to false are deprecated.
  mongoose.connect(mongoUri, { useCreateIndex: true, dbName: dbName, useFindAndModify: false, useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log('Connected to MongoDB')
    })
    .catch(e => {
      console.log(e);
    })
})
