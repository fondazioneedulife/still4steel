import express from "express";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger.js";
import { router as authRoutes } from "./routes/auth.js";
import companyRoutes from "./routes/companyRoutes.js";
import warehousesRouter from "./routes/warehouseRoutes.js";
import ivaRouter from "./routes/ivaRoutes.js"
import productRouter from "./routes/productRoutes.js"
import categoryRoutes from "./routes/categoryRoutes.js";
import product_categoryRoutes from "./routes/product_categoryRoutes.js"
import discountRoutes from "./routes/discountRoutes.js"
import product_discountRoutes from "./routes/product_discountRoutes.js"
import customerRoutes from "./routes/customerRoutes.js"
import company_customerRoutes from "./routes/company_customerRoutes.js";

const app = express();
app.use(express.json());

// Rotte API
app.use("/api/auth", authRoutes);

// CRUD companies
app.use("/api/company", companyRoutes);

// CRUD warehouse
app.use("/api/warehouse", warehousesRouter);

// CRUD iva
app.use("/api/iva", ivaRouter);

// CRUD product
app.use("/api/product", productRouter);

// CRUD category
app.use("/api/category", categoryRoutes);

// CRUD product_category
app.use("/api/product_category", product_categoryRoutes);

// CRUD discount
app.use("/api/discount", discountRoutes);

// CRUD product_discount
app.use("/api/product_discount", product_discountRoutes);

// CRUD customer
app.use("/api/customer", customerRoutes);

// CRUD company_customer
app.use("/api/company_customer", company_customerRoutes);

// Documentazione Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec, { explorer: true }));

  

export default app;

