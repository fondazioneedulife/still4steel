import express from "express";
import { 
  createProduct, getProducts, getProductById, 
  updateProduct, deleteProduct
} from "../controllers/productController.js";
import { authenticateUser, validateCompanyData } from "../middlewares/middleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Product
 *   description: API per la gestione dei prodotti
 */

/**
 * @swagger
 * /product:
 *   get:
 *     summary: Ottiene tutti i prodotti
 *     tags: [Product]
 *     responses:
 *       200:
 *         description: Lista di prodotti
 */
router.get("/", getProducts);

/**
 * @swagger
 * /product/{id}:
 *   get:
 *     summary: Ottiene un prodotto per ID
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Dettagli del prodotto
 */
router.get("/:id", getProductById);

/**
 * @swagger
 * /product:
 *   post:
 *     summary: Crea un nuovo prodotto
 *     tags: [Product]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, code, unit_price, quantity, description, company_id, warehouse_id, iva_id]
 *             properties:
 *               name:
 *                 type: string
 *               code:
 *                 type: string
 *               unit_price:
 *                 type: integer
 *               quantity:
 *                 type: integer
 *              description:
 *                 type: string
 *              company_id:
 *                 type: integer
 *              warehouse_id:
 *                 type: integer
 *              iva_id:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Prodotto creato con successo
 */
router.post("/", createProduct);

/**
 * @swagger
 * /product/{id}:
 *   put:
 *     summary: Aggiorna un prodotto esistente
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               code:
 *                 type: string
 *               unit_price:
 *                 type: integer
 *               quantity:
 *                 type: integer
 *              description:
 *                 type: string
 *              company_id:
 *                 type: integer
 *              warehouse_id:
 *                 type: integer
 *              iva_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Prodotto aggiornato con successo
 */
router.put("/:id", updateProduct);

/**
 * @swagger
 * /product/{id}:
 *   delete:
 *     summary: Elimina un prodotto
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Prodotto eliminato
 */
router.delete("/:id", deleteProduct);

export default router;