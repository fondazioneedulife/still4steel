import express from "express";
import { 
  createProduct, getProducts, getProductById, 
  updateProduct, deleteProduct
} from "../controllers/productController.js";
import { authenticateUser} from "../middlewares/middleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: API per la gestione dei prodotti
 */

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Ottiene tutti i prodotti
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Lista di tutti i prodotti
 *       500:
 *         description: Errore interno del server
 */
router.get("/", getProducts);

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Ottiene un prodotto per ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del prodotto
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Dettagli del prodotto richiesto
 *       404:
 *         description: Prodotto non trovato
 *       500:
 *         description: Errore interno del server
 */
router.get("/:id", getProductById);

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Crea un nuovo prodotto
 *     tags: [Products]
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
 *                 type: number
 *               quantity:
 *                 type: integer
 *               description:
 *                 type: string
 *               company_id:
 *                 type: integer
 *               warehouse_id:
 *                 type: integer
 *               iva_id:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Prodotto creato con successo
 *       400:
 *         description: Dati non validi
 *       500:
 *         description: Errore interno del server
 */
router.post("/", createProduct);

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Aggiorna un prodotto esistente
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del prodotto da aggiornare
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
 *                 type: number
 *               quantity:
 *                 type: integer
 *               description:
 *                 type: string
 *               company_id:
 *                 type: integer
 *               warehouse_id:
 *                 type: integer
 *               iva_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Prodotto aggiornato con successo
 *       400:
 *         description: Dati non validi
 *       404:
 *         description: Prodotto non trovato
 *       500:
 *         description: Errore interno del server
 */
router.put("/:id", updateProduct);

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Elimina un prodotto
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del prodotto da eliminare
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Prodotto eliminato con successo
 *       404:
 *         description: Prodotto non trovato
 *       500:
 *         description: Errore interno del server
 */
router.delete("/:id", deleteProduct);

export default router;