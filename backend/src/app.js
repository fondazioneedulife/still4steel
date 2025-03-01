import express from "express";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./docs/swagger.js";
import { router as authRoutes } from "./routes/auth.js"; // Import con estensione .js
import companiesRoutes from "./routes/companies.js";
import warehousesRoutes from "./routes/warehouses.js";

const app = express();
app.use(express.json());

// Rotte API
app.use("/api/auth", authRoutes);

// CRUD companies
app.use("/api/companies", companiesRoutes);

// CRUD warehouse
app.use("/api/warehouses", warehousesRoutes);

// Documentazione Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app; // Usa export default per compatibilità con import

