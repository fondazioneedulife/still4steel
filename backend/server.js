import Koa from 'koa';
import Router from 'koa-router';
import { query } from './src/db';
import setupSwagger from './src/config/swagger';

const app = new Koa();
const router = new Router();

router.get('/test-db', async (ctx) => {
  try {
    const result = await query('SELECT NOW()');
    ctx.body = { message: 'Database connesso', time: result.rows[0] };
  } catch (err) {
    ctx.status = 500;
    ctx.body = { error: 'Errore di connessione al database' };
  }
});

// configure routes and Swagger
setupSwagger(app);
app.use(router.routes()).use(router.allowedMethods());

// run server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Backend in ascolto sulla porta ${PORT}`);
  console.log(`Documentazione Swagger disponibile su http://localhost:${PORT}/docs`);
});