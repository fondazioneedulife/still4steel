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
import suppliersRoutes from "./routes/suppliersRoutes.js";
import suppliesRoutes from "./routes/suppliesRoutes.js";
import companySupplyRoutes from "./routes/companySupplyRoutes.js";
import ordersRoutes from "./routes/ordersRoutes.js";
import rendersRoutes from "./routes/rendersRoutes.js";
import salesRoutes from "./routes/salesRoutes.js";
import salePaymentRoutes from "./routes/salePaymentRoutes.js";
import companySupplierRoutes from "./routes/companySupplierRoutes.js";
import supplyProductRoutes from "./routes/supplyProductRoutes.js";
import invoiceRoutes from "./routes/invoiceRoutes.js";
import orderDetailsRoutes from "./routes/orderDetailsRoutes.js";
import paymentsRoutes from "./routes/paymentsRoutes.js";
import saleDiscountRoutes from "./routes/saleDiscountRoutes.js";
import logsRoutes from "./routes/logsRoutes.js";


const app = express();
app.use(express.json());

app.use("/:company_id/customers/:id", authenticateUser, getCustomerById);


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

// CRUD suppliersCustomer
app.use("/api/suppliersCustomer", suppliersRoutes);

// CRUD suppliesCustomer
app.use("/api/suppliesCustomer", suppliesRoutes);

// CRUD companySupplyCustomer
app.use("/api/companySupplyCustomer", companySupplyRoutes);

// CRUD ordersCustomer
app.use("/api/order", ordersRoutes);

// CRUD rendersCustomer
app.use("/api/rendersCustomer", rendersRoutes);

// CRUD salesCustomer
app.use("/api/salesCustomer", salesRoutes);

// CRUD salePaymentCustomer
app.use("/api/salePaymentCustomer", salePaymentRoutes);

// Documentazione Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec, { explorer: true }));

// Gestione delle associazioni azienda-fornitore
app.use("/api/company_suppliers", companySupplierRoutes);

// Gestione delle associazioni prodotto-fornitura
app.use("/api/supply_products", supplyProductRoutes);

// Gestione delle fatture
app.use("/api/invoices", invoiceRoutes);

// Gestione dei dettagli ordine
app.use("/api/order_details", orderDetailsRoutes);

// Gestione dei pagamenti
app.use("/api/payments", paymentsRoutes);

// Gestione delle associazioni vendita-sconto
app.use("/api/sale_discounts", saleDiscountRoutes);

// Gestione dei log
app.use("/api/logs", logsRoutes);

export default app;

