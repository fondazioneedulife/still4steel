import express from "express";
import {
    getAllSupplyProducts,
    getSupplyProductById,
    createSupplyProduct,
    updateSupplyProduct,
    deleteSupplyProduct
} from "../controllers/supplyProductsController.js";


const router = express.Router();


/**
 * @swagger
 * tags:
 *   name: SupplyProducts
 *   description: API per la gestione della relazione tra forniture e prodotti
 */

/**
 * @swagger
 * /supply-products:
 *   get:
 *     summary: Ottiene tutte le relazioni tra forniture e prodotti
 *     tags: [SupplyProducts]
 *     responses:
 *       200:
 *         description: Lista di tutte le relazioni tra prodotti e forniture
 *       500:
 *         description: Errore interno del server
 */
router.get("/", getAllSupplyProducts); 


/**
 * @swagger
 * /supply-products/{id}:
 *   get:
 *     summary: Ottiene una relazione specifica tra fornitura e prodotto per ID
 *     tags: [SupplyProducts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID della relazione tra prodotto e fornitura
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
router.get("/:id", getSupplyProductById); 


/**
 * @swagger
 * /supply-products:
 *   post:
 *     summary: Crea una nuova relazione tra un prodotto e una fornitura
 *     tags: [SupplyProducts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - product_id
 *               - supply_id
 *             properties:
 *               product_id:
 *                 type: integer
 *                 description: ID del prodotto
 *               supply_id:
 *                 type: integer
 *                 description: ID della fornitura
 *     responses:
 *       201:
 *         description: Relazione creata con successo
 *       400:
 *         description: Dati non validi
 *       500:
 *         description: Errore interno del server
 */
router.post("/", createSupplyProduct); 


/**
 * @swagger
 * /supply-products/{id}:
 *   put:
 *     summary: Aggiorna una relazione tra un prodotto e una fornitura
 *     tags: [SupplyProducts]
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
 *             properties:
 *               product_id:
 *                 type: integer
 *                 description: Nuovo ID del prodotto
 *               supply_id:
 *                 type: integer
 *                 description: Nuovo ID della fornitura
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
router.put("/:id", updateSupplyProduct);


/**
 * @swagger
 * /supply-products/{id}:
 *   delete:
 *     summary: Elimina una relazione tra un prodotto e una fornitura
 *     tags: [SupplyProducts]
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
router.delete("/:id", deleteSupplyProduct);


export default router;