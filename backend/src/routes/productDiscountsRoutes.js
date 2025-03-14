import express from "express";
import { 
    getAllProductDiscounts, 
    getProductDiscountById, 
    createProductDiscount, 
    updateProductDiscount, 
    deleteProductDiscount 
} from "../controllers/productDiscountsController.js";


const router = express.Router();


/**
 * @swagger
 * tags:
 *   name: ProductDiscounts
 *   description: API per la gestione delle relazioni tra prodotti e sconti
 */


/**
 * @swagger
 * /product-discounts:
 *   get:
 *     summary: Ottiene tutte le relazioni tra prodotti e sconti
 *     tags: [ProductDiscounts]
 *     responses:
 *       200:
 *         description: Lista delle relazioni tra prodotti e sconti
 *       500:
 *         description: Errore interno del server
 */
router.get("/", getAllProductDiscounts);


/**
 * @swagger
 * /product-discounts/{id}:
 *   get:
 *     summary: Ottiene una relazione prodotto-sconto per ID
 *     tags: [ProductDiscounts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID della relazione prodotto-sconto
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
router.get("/:id", getProductDiscountById);


/**
 * @swagger
 * /product-discounts:
 *   post:
 *     summary: Crea una nuova relazione tra un prodotto e uno sconto
 *     tags: [ProductDiscounts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - product_id
 *               - discount_id
 *             properties:
 *               product_id:
 *                 type: integer
 *                 description: ID del prodotto
 *               discount_id:
 *                 type: integer
 *                 description: ID dello sconto
 *     responses:
 *       201:
 *         description: Relazione creata con successo
 *       400:
 *         description: Dati non validi
 *       500:
 *         description: Errore interno del server
 */
router.post("/", createProductDiscount);


/**
 * @swagger
 * /product-discounts/{id}:
 *   put:
 *     summary: Aggiorna una relazione prodotto-sconto esistente
 *     tags: [ProductDiscounts]
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
 *                 description: Nuovo ID del prodotto (opzionale)
 *               discount_id:
 *                 type: integer
 *                 description: Nuovo ID dello sconto (opzionale)
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
router.put("/:id", updateProductDiscount);


/**
 * @swagger
 * /product-discounts/{id}:
 *   delete:
 *     summary: Elimina una relazione tra un prodotto e uno sconto
 *     tags: [ProductDiscounts]
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
router.delete("/:id", deleteProductDiscount);


export default router;