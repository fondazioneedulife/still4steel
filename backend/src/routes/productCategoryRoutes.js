import express from "express";
import {
    getProductCategories,
    getProductCategoryById,
    createProductCategory,
    updateProductCategory,
    deleteProductCategory
} from "../controllers/product_categoryController.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: ProductCategory
 *   description: API per la gestione delle associazioni tra prodotti e categorie
 */

/**
 * @swagger
 * /product-category:
 *   get:
 *     summary: Ottiene tutte le associazioni tra prodotti e categorie
 *     tags: [ProductCategory]
 *     responses:
 *       200:
 *         description: Lista di tutte le associazioni
 *       500:
 *         description: Errore interno del server
 */
router.get("/", getProductCategories);

/**
 * @swagger
 * /product-category/{id}:
 *   get:
 *     summary: Ottiene un'associazione tra prodotto e categoria per ID
 *     tags: [ProductCategory]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID dell'associazione
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Dettagli dell'associazione richiesta
 *       404:
 *         description: Associazione non trovata
 *       500:
 *         description: Errore interno del server
 */
router.get("/:id", getProductCategoryById);

/**
 * @swagger
 * /product-category:
 *   post:
 *     summary: Crea una nuova associazione tra prodotto e categoria
 *     tags: [ProductCategory]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               product_id:
 *                 type: integer
 *               category_id:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Associazione creata con successo
 *       400:
 *         description: Dati non validi
 *       500:
 *         description: Errore interno del server
 */
router.post("/", createProductCategory);


/**
 * @swagger
 * /product-category/{id}:
 *   put:
 *     summary: Aggiorna un'associazione tra prodotto e categoria
 *     tags: [ProductCategory]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID dell'associazione da aggiornare
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               product_id:
 *                 type: integer
 *               category_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Associazione aggiornata con successo
 *       400:
 *         description: Dati non validi
 *       404:
 *         description: Associazione non trovata
 *       500:
 *         description: Errore interno del server
 */
router.put("/:id", updateProductCategory);


/**
 * @swagger
 * /product-category/{id}:
 *   delete:
 *     summary: Elimina un'associazione tra prodotto e categoria
 *     tags: [ProductCategory]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID dell'associazione da eliminare
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Associazione eliminata con successo
 *       404:
 *         description: Associazione non trovata
 *       500:
 *         description: Errore interno del server
 */
router.delete("/:id", deleteProductCategory);

export default router;