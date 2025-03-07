import express from "express";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger.js";
import { router as authRoutes } from "./routes/auth.js";
import companyRoutes from "./routes/companyRoutes.js";
import warehousesRouter from "./routes/warehouseRoutes.js";
import ivaRouter from "./routes/ivaRoutes.js"
import productRouter from "./routes/productRoutes.js"
import categoryRoutes from "./routes/categoryRoutes.js";
import productCategoryRoutes from "./routes/productCategoryRoutes.js"
import discountRoutes from "./routes/discountRoutes.js"
import productDiscountRoutes from "./routes/productDiscountRoutes.js"
import customerRoutes from "./routes/customerRoutes.js"
import companyCustomerRoutes from "./routes/companyCustomerRoutes.js";

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
app.use("/api/product_category", productCategoryRoutes);

// CRUD discount
app.use("/api/discount", discountRoutes);

// CRUD product_discount
app.use("/api/product_discount", productDiscountRoutes);

// CRUD customer
app.use("/api/customer", customerRoutes);

// CRUD company_customer
app.use("/api/company_customer", companyCustomerRoutes);



// Documentazione Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec, { explorer: true }));

  

export default app;

