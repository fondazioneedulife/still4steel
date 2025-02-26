const Koa = require('koa');
const Router = require('@koa/router');
const pool = require('./db');

const app = new Koa();
const router = new Router();

router.get('/test-db', async (ctx) => {
  try {
    const result = await pool.query('SELECT NOW()');
    ctx.body = {
      success: true,
      time: result.rows[0].now
    };
  } catch (err) {
    ctx.status = 500;
    ctx.body = { success: false, error: err.message };
  }
});

app.use(router.routes()).use(router.allowedMethods());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
