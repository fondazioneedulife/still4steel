const Koa = require('koa');
const Router = require('koa-router');
const pool = require('./src/db'); // import db
const setupSwagger = require('./src/config/swagger'); // import Swagger

const app = new Koa();
const router = new Router();

// API to test the database connection
/**
 * @openapi
 * /test-db:
 *   get:
 *     summary: Testa la connessione al database
 *     description: Esegue una query per verificare la connessione al database
 *     responses:
 *       200:
 *         description: Connessione riuscita
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 time:
 *                   type: string
 *       500:
 *         description: Errore di connessione
 */
router.get('/test-db', async (ctx) => {
  try {
    const result = await pool.query('SELECT NOW()');
    ctx.body = { message: 'Database connesso', time: result.rows[0] };
  } catch (err) {
    ctx.status = 500;
    ctx.body = { error: 'Errore di connessione al database' };
  }
});

// configure routes and Swagger
app.use(router.routes()).use(router.allowedMethods());
setupSwagger(app, router);

// run server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Backend in ascolto sulla porta ${PORT}`);
  console.log(`📄 Documentazione Swagger disponibile su http://localhost:${PORT}/docs`);
});
