require('dotenv').config();
const Koa = require('koa');
const Router = require('@koa/router');
const Knex = require('knex');
const { Model } = require('objection');

const knexConfig = require('../knexfile');
const knex = Knex(knexConfig.development);
Model.knex(knex);

const app = new Koa();
const router = new Router();

router.get('/', async (ctx) => {
  ctx.body = { message: 'Hello from Koa inside Docker!' };
});

app.use(router.routes()).use(router.allowedMethods());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
