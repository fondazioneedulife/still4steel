import express from "express";
import { 
    getAllProductCategories, 
    getProductCategoryById, 
    createProductCategory, 
    updateProductCategory, 
    deleteProductCategory 
} from "../controllers/productCategoryController.js";


const router = express.Router();


/**
 * @swagger
 * tags:
 *   name: ProductCategories
 *   description: API per la gestione delle relazioni tra prodotti e categorie
 */

/**
 * @swagger
 * /product-categories:
 *   get:
 *     summary: Ottiene tutte le relazioni tra prodotti e categorie
 *     tags: [ProductCategories]
 *     responses:
 *       200:
 *         description: Lista di tutte le relazioni
 *       500:
 *         description: Errore interno del server
 */
router.get("/", getAllProductCategories);


/**
 * @swagger
 * /product-categories/{id}:
 *   get:
 *     summary: Ottiene una relazione tra prodotto e categoria per ID
 *     tags: [ProductCategories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID della relazione
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Dettagli della relazione richiesta
 *       404:
 *         description: Relazione non trovata
 *       500:
 *         description: Errore interno del server
 */
router.get("/:id", getProductCategoryById);


/**
 * @swagger
 * /product-categories:
 *   post:
 *     summary: Crea una nuova relazione tra prodotto e categoria
 *     tags: [ProductCategories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - product_id
 *               - category_id
 *             properties:
 *               product_id:
 *                 type: integer
 *                 description: ID del prodotto
 *               category_id:
 *                 type: integer
 *                 description: ID della categoria
 *     responses:
 *       201:
 *         description: Relazione creata con successo
 *       400:
 *         description: Dati non validi
 *       500:
 *         description: Errore interno del server
 */
router.post("/", createProductCategory);


/**
 * @swagger
 * /product-categories/{id}:
 *   put:
 *     summary: Aggiorna una relazione tra prodotto e categoria esistente
 *     tags: [ProductCategories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID della relazione da aggiornare
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - product_id
 *               - category_id
 *             properties:
 *               product_id:
 *                 type: integer
 *                 description: nuovo ID del prodotto
 *               category_id:
 *                 type: integer
 *                 description: nuovo ID della categoria
 *     responses:
 *       200:
 *         description: Relazione aggiornata con successo
 *       400:
 *         description: Dati non validi
 *       404:
 *         description: Relazione non trovata
 *       500:
 *         description: Errore interno del server
 */
router.put("/:id", updateProductCategory);


/**
 * @swagger
 * /product-categories/{id}:
 *   delete:
 *     summary: Elimina una relazione tra prodotto e categoria
 *     tags: [ProductCategories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID della relazione da eliminare
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Relazione eliminata con successo
 *       404:
 *         description: Relazione non trovata
 *       500:
 *         description: Errore interno del server
 */
router.delete("/:id", deleteProductCategory);


export default router;