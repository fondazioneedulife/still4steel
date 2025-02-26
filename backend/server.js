const Koa = require('koa');
const Router = require('koa-router');
const pool = require('./db');

const app = new Koa();
const router = new Router();

router.get('/test-db', async (ctx) => {
  try {
    const result = await pool.query('SELECT NOW()');
    ctx.body = { message: 'Database connesso', time: result.rows[0] };
  } catch (err) {
    ctx.status = 500;
    ctx.body = { error: 'Errore di connessione al database' };
  }
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(4000, () => {
  console.log('🚀 Backend in ascolto sulla porta 4000');
});