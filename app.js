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
const { typeDefs, resolvers } = require('./core/api/apollo-def')
const { ApolloServer } = require('apollo-server-koa');

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

const static_pages = new Koa();
static_pages.use(serve(__dirname + "/build")); //serve the build directory
app.use(mount("/", static_pages));

const router = new Router();
router.use('/api', api.routes());
app.use(router.routes()).use(router.allowedMethods());

let mongoUri = process.env.MONGO_ENDPOINT
let port = 80
if (process.env.NODE_ENV !== 'production') { //development
    port = 8080;
}

const apollo = new ApolloServer({ typeDefs, resolvers });
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
