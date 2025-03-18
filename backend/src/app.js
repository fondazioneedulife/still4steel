import express from "express";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger.js";
import { router as authRoutes } from "./routes/auth.js";
import companiesRoutes from "./routes/companiesRoutes.js";
import warehousesRoutes from "./routes/warehousesRoutes.js";
import ivaRoutes from "./routes/ivaRoutes.js"
import productsRoutes from "./routes/productsRoutes.js"
import categoriesRoutes from "./routes/categoriesRoutes.js";
import productCategoriesRoutes from "./routes/productCategoriesRoutes.js"
import discountsRoutes from "./routes/discountsRoutes.js"
import productDiscountsRoutes from "./routes/productDiscountsRoutes.js"
import customersRoutes from "./routes/customersRoutes.js"
import companyCustomersRoutes from "./routes/companyCustomersRoutes.js";
import suppliersRoutes from "./routes/suppliersRoutes.js";
import suppliesRoutes from "./routes/suppliesRoutes.js";
import companySuppliesRoutes from "./routes/companySuppliesRoutes.js";
import ordersRoutes from "./routes/ordersRoutes.js";
import rendersRoutes from "./routes/rendersRoutes.js";
import salesRoutes from "./routes/salesRoutes.js";
import salePaymentsRoutes from "./routes/salePaymentsRoutes.js";
import companySuppliersRoutes from "./routes/companySuppliersRoutes.js";
import supplyProductsRoutes from "./routes/supplyProductsRoutes.js";
import invoicesRoutes from "./routes/invoicesRoutes.js";
import orderDetailsRoutes from "./routes/orderDetailsRoutes.js";
import paymentsRoutes from "./routes/paymentsRoutes.js";
import saleDiscountsRoutes from "./routes/saleDiscountsRoutes.js";
import logsRoutes from "./routes/logsRoutes.js";
import tokenRoutes from "./routes/token.js";
import endpointsRoutes from "./endpoint/endpointsRoutes.js";
import cookieRouter from "./endpoint/CookieController.js";
import variablesRoutes from "./routes/variablesRoutes.js";
import prodottiRoutes from "./routes/prodottiRoutes.js";
import cors from "cors";


const app = express();
app.use(express.json());
app.use(cors(corsOptions));

var corsOptions = {
    origin: 'http://127.0.0.1',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

// CRUD prodotti
app.use("/api/prodotti", prodottiRoutes);

// CRUD variables
app.use("/api/variables", variablesRoutes);

// Token
app.use("/api/token", tokenRoutes);

// Cookie
app.use("/api/cookie", cookieRouter);

//endpoint
app.use("/endpoints", endpointsRoutes);


// Rotte API
app.use("/api/auth", authRoutes);

// CRUD companies
app.use("/api/companies", companiesRoutes);

// CRUD warehouses
app.use("/api/warehouses", warehousesRoutes);

// CRUD IVA
app.use("/api/iva", ivaRoutes);

// CRUD products
app.use("/api/products", productsRoutes);

// CRUD categories
app.use("/api/categories", categoriesRoutes);

// CRUD productCategories
app.use("/api/productCategories", productCategoriesRoutes);

// CRUD discounts
app.use("/api/discounts", discountsRoutes);

// CRUD productDiscounts
app.use("/api/productDiscounts", productDiscountsRoutes);

// CRUD customers
app.use("/api/customers", customersRoutes);

// CRUD companyCustomers
app.use("/api/companyCustomers", companyCustomersRoutes);

// CRUD suppliers
app.use("/api/suppliers", suppliersRoutes);

// CRUD supplyCustomers
app.use("/api/supplyCustomers", suppliesRoutes);

// CRUD companySupplies
app.use("/api/companySupplies", companySuppliesRoutes);

// CRUD orders
app.use("/api/orders", ordersRoutes);

// CRUD renderCustomers
app.use("/api/renderCustomers", rendersRoutes);

// CRUD saleCustomers
app.use("/api/saleCustomers", salesRoutes);

// CRUD salePayments
app.use("/api/salePayments", salePaymentsRoutes);

// CRUD companySuppliers
app.use("/api/companySuppliers", companySuppliersRoutes);

// CRUD supplyProducts
app.use("/api/supplyProducts", supplyProductsRoutes);

// CRUD invoices
app.use("/api/invoices", invoicesRoutes);

// CRUD orderDetails
app.use("/api/orderDetails", orderDetailsRoutes);

// CRUD payments
app.use("/api/payments", paymentsRoutes);

// CRUD saleDiscounts
app.use("/api/saleDiscounts", saleDiscountsRoutes);

// Gestione di logs
app.use("/api/logs", logsRoutes);


// Documentazione Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec, { explorer: true }));


export default app;