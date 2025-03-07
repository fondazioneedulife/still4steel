import express from "express";
import {
    getProductDiscounts,
    getProductDiscountById,
    createProductDiscount,
    updateProductDiscount,
    deleteProductDiscount
} from "../controllers/product_discountController.js";

const router = express.Router();


/**
 * @swagger
 * tags:
 *   name: ProductDiscounts
 *   description: API per la gestione delle associazioni tra prodotti e sconti
 */

/**
 * @swagger
 * /product-discounts:
 *   get:
 *     summary: Ottiene tutte le associazioni tra prodotti e sconti
 *     tags: [ProductDiscounts]
 *     responses:
 *       200:
 *         description: Lista delle associazioni tra prodotti e sconti
 *       500:
 *         description: Errore interno del server
 */
router.get("/", getProductDiscounts);


/**
 * @swagger
 * /product-discounts/{id}:
 *   get:
 *     summary: Ottiene un'associazione prodotto-sconto per ID
 *     tags: [ProductDiscounts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID dell'associazione prodotto-sconto
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
router.get("/:id", getProductDiscountById);


/**
 * @swagger
 * /product-discounts:
 *   post:
 *     summary: Crea una nuova associazione tra un prodotto e uno sconto
 *     tags: [ProductDiscounts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               product_id:
 *                 type: integer
 *               discount_id:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Associazione creata con successo
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
 *     summary: Aggiorna un'associazione prodotto-sconto
 *     tags: [ProductDiscounts]
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
 *               discount_id:
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
router.put("/:id", updateProductDiscount);


/**
 * @swagger
 * /product-discounts/{id}:
 *   delete:
 *     summary: Elimina un'associazione tra un prodotto e uno sconto
 *     tags: [ProductDiscounts]
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
router.delete("/:id", deleteProductDiscount);

export default router;