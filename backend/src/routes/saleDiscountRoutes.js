import express from "express";
import {
    getAllSaleDiscounts,
    getSaleDiscountById,
    createSaleDiscount,
    updateSaleDiscount,
    deleteSaleDiscount
} from "../controllers/saleDiscountController.js";


const router = express.Router();


/**
 * @swagger
 * tags:
 *   name: SaleDiscounts
 *   description: API per la gestione degli sconti applicati alle vendite
 */

/**
 * @swagger
 * /sale-discounts:
 *   get:
 *     summary: Ottiene tutti gli sconti delle vendite
 *     tags: [SaleDiscounts]
 *     responses:
 *       200:
 *         description: Lista di tutti gli sconti applicati alle vendite
 *       500:
 *         description: Errore interno del server
 */
router.get("/", getAllSaleDiscounts); 


/**
 * @swagger
 * /sale-discounts/{id}:
 *   get:
 *     summary: Ottiene uno sconto della vendita per ID
 *     tags: [SaleDiscounts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID dello sconto della vendita
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Dettagli dello sconto della vendita richiesto
 *       404:
 *         description: Sconto della vendita non trovato
 *       500:
 *         description: Errore interno del server
 */
router.get("/:id", getSaleDiscountById); 


/**
 * @swagger
 * /sale-discounts:
 *   post:
 *     summary: Crea un nuovo sconto per una vendita
 *     tags: [SaleDiscounts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - sale_id
 *               - discount_id
 *             properties:
 *               sale_id:
 *                 type: integer
 *                 description: ID della vendita a cui applicare lo sconto
 *               discount_id:
 *                 type: integer
 *                 description: ID dello sconto applicato alla vendita
 *     responses:
 *       201:
 *         description: Sconto della vendita creato con successo
 *       400:
 *         description: Dati non validi
 *       500:
 *         description: Errore interno del server
 */
router.post("/", createSaleDiscount); 


/**
 * @swagger
 * /sale-discounts/{id}:
 *   put:
 *     summary: Aggiorna uno sconto della vendita esistente
 *     tags: [SaleDiscounts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID dello sconto della vendita da aggiornare
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - sale_id
 *               - discount_id
 *             properties:
 *               sale_id:
 *                 type: integer
 *                 description: ID della vendita a cui applicare lo sconto
 *               discount_id:
 *                 type: integer
 *                 description: ID dello sconto applicato alla vendita
 *     responses:
 *       200:
 *         description: Sconto della vendita aggiornato con successo
 *       400:
 *         description: Dati non validi
 *       404:
 *         description: Sconto della vendita non trovato
 *       500:
 *         description: Errore interno del server
 */
router.put("/:id", updateSaleDiscount); 


/**
 * @swagger
 * /sale-discounts/{id}:
 *   delete:
 *     summary: Elimina uno sconto di vendita
 *     tags: [SaleDiscounts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID dello sconto di vendita da eliminare
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Sconto della vendita eliminato con successo
 *       404:
 *         description: Sconto della vendita non trovato
 *       500:
 *         description: Errore interno del server
 */
router.delete("/:id", deleteSaleDiscount); 


export default router;