import express from "express";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger.js";
import { router as authRoutes } from "./router/auth.js";
import companyRoutes from "./router/companyRoutes.js";
import warehousesRouter from "./router/warehouseRouter.js";
import ivaRouter from "./router/ivaRouter.js"
import productRouter from "./router/productRouter.js"

const app = express();
app.use(express.json());

// Rotte API
app.use("/api/auth", authRoutes);

// CRUD companies
app.use("/api/company", companyRoutes);

// CRUD warehouse
app.use("/api/warehouses", warehousesRouter);

// CRUD iva
app.use("/api/iva", ivaRouter);

// CRUD product
app.use("/api/product", productRouter);

// Documentazione Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec, { explorer: true }));

  

export default app;

