import express from "express";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./docs/swagger.js";
import { router as authRoutes } from "./routes/auth.js"; // Import con estensione .js

const app = express();
app.use(express.json());

// Rotte API
app.use("/api/auth", authRoutes);

// Documentazione Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app; // Usa export default per compatibilità con import

