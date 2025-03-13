import express from "express";
import {
    getAllOrderDetails,
    getOrderDetailById,
    createOrderDetail,
    updateOrderDetail,
    deleteOrderDetail
} from "../controllers/orderDetailsController.js";


const router = express.Router();


/**
 * @swagger
 * tags:
 *   name: OrderDetails
 *   description: API per la gestione dei dettagli degli ordini
 */

/**
 * @swagger
 * /order-details:
 *   get:
 *     summary: Ottiene tutti i dettagli degli ordini
 *     tags: [OrderDetails]
 *     responses:
 *       200:
 *         description: Lista di tutti i dettagli degli ordini
 *       500:
 *         description: Errore interno del server
 */
router.get("/", getAllOrderDetails); 


/**
 * @swagger
 * /order-details/{id}:
 *   get:
 *     summary: Ottiene un dettaglio d'ordine per ID
 *     tags: [OrderDetails]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del dettaglio d'ordine
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Dettaglio d'ordine richiesto
 *       404:
 *         description: Dettaglio non trovato
 *       500:
 *         description: Errore interno del server
 */
router.get("/:id", getOrderDetailById);


/**
 * @swagger
 * /order-details:
 *   post:
 *     summary: Crea un nuovo dettaglio d'ordine
 *     tags: [OrderDetails]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - quantity
 *               - product_id
 *               - order_id
 *             properties:
 *               quantity:
 *                 type: integer
 *                 description: Quantità del prodotto ordinato (deve essere > 0)
 *               note:
 *                 type: string
 *                 description: Note aggiuntive
 *               product_id:
 *                 type: integer
 *                 description: ID del prodotto
 *               order_id:
 *                 type: integer
 *                 description: ID dell'ordine
 *     responses:
 *       201:
 *         description: Dettaglio d'ordine creato con successo
 *       400:
 *         description: Dati non validi
 *       500:
 *         description: Errore interno del server
 */
router.post("/", createOrderDetail); 


/**
 * @swagger
 * /order-details/{id}:
 *   put:
 *     summary: Aggiorna un dettaglio d'ordine esistente
 *     tags: [OrderDetails]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del dettaglio d'ordine da aggiornare
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               quantity:
 *                 type: integer
 *                 description: Quantità aggiornata
 *               note:
 *                 type: string
 *                 description: Note aggiornate
 *               product_id:
 *                 type: integer
 *                 description: ID aggiornato del prodotto
 *               order_id:
 *                 type: integer
 *                 description: ID aggiornato dell'ordine
 *     responses:
 *       200:
 *         description: Dettaglio d'ordine aggiornato con successo
 *       400:
 *         description: Dati non validi
 *       404:
 *         description: Dettaglio non trovato
 *       500:
 *         description: Errore interno del server
 */
router.put("/:id", updateOrderDetail);


/**
 * @swagger
 * /order-details/{id}:
 *   delete:
 *     summary: Elimina un dettaglio d'ordine
 *     tags: [OrderDetails]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del dettaglio d'ordine da eliminare
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Dettaglio d'ordine eliminato con successo
 *       404:
 *         description: Dettaglio non trovato
 *       500:
 *         description: Errore interno del server
 */
router.delete("/:id", deleteOrderDetail);


export default router;