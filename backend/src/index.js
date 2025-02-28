import Koa from "koa";
import Router from "@koa/router";
import bodyParser from "koa-bodyparser";
import cors from "@koa/cors";
import setupSwagger from "./docs/swagger.js";
import { routes, allowedMethods } from "./routes/companies.js";

const app = new Koa();
const router = new Router();

// Middleware
app.use(cors()); // Per permettere richieste da altri domini (frontend)
app.use(bodyParser()); // Per gestire le richieste con JSON

// Configurare Swagger UI
setupSwagger(app);

// Rotta di test connessione DB
router.get("/test-db", async (ctx) => {
  try {
    const result = await db.query("SELECT NOW()");
    ctx.body = { success: true, time: result.rows[0].now };
  } catch (err) {
    ctx.status = 500;
    ctx.body = { success: false, error: err.message };
  }
});

// Includere le API per companies
app.use(routes()).use(allowedMethods());

// Aggiungere altre rotte
app.use(router.routes()).use(router.allowedMethods());

// Avvio del server sulla porta 4000
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
