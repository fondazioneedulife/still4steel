import express from "express";
import { 
  getAllOrders, 
  getOrderById, 
  createOrder, 
  updateOrder, 
  deleteOrder 
} from "../controllers/ordersController.js";


const router = express.Router();


/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: API per la gestione degli ordini
 */

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Ottiene tutti gli ordini
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: Lista di tutti gli ordini
 *       500:
 *         description: Errore interno del server
 */
router.get("/", getAllOrders);      


/**
 * @swagger
 * /orders/{id}:
 *   get:
 *     summary: Ottiene un ordine per ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID dell'ordine
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Dettagli dell'ordine richiesto
 *       404:
 *         description: Ordine non trovato
 *       500:
 *         description: Errore interno del server
 */
router.get("/:id", getOrderById); 


/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Crea un nuovo ordine
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - state
 *               - customer_id
 *               - company_id
 *             properties:
 *               state:
 *                 type: string
 *                 description: Stato dell'ordine (es. "In elaborazione", "Spedito")
 *               note:
 *                 type: string
 *                 description: Note aggiuntive sull'ordine
 *               customer_id:
 *                 type: integer
 *                 description: ID del cliente associato all'ordine
 *               company_id:
 *                 type: integer
 *                 description: ID dell'azienda che gestisce l'ordine
 *               invoice_id:
 *                 type: integer
 *                 description: ID della fattura associata (opzionale)
 *     responses:
 *       201:
 *         description: Ordine creato con successo
 *       400:
 *         description: Dati non validi
 *       500:
 *         description: Errore interno del server
 */
router.post("/", createOrder); 


/**
 * @swagger
 * /orders/{id}:
 *   put:
 *     summary: Aggiorna un ordine esistente
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID dell'ordine da aggiornare
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               state:
 *                 type: string
 *                 description: Stato aggiornato dell'ordine
 *               note:
 *                 type: string
 *                 description: Note aggiornate
 *               customer_id:
 *                 type: integer
 *                 description: ID aggiornato del cliente
 *               company_id:
 *                 type: integer
 *                 description: ID aggiornato dell'azienda
 *               invoice_id:
 *                 type: integer
 *                 description: ID aggiornato della fattura associata
 *     responses:
 *       200:
 *         description: Ordine aggiornato con successo
 *       400:
 *         description: Dati non validi
 *       404:
 *         description: Ordine non trovato
 *       500:
 *         description: Errore interno del server
 */
router.put("/:id", updateOrder); 


/**
 * @swagger
 * /orders/{id}:
 *   delete:
 *     summary: Elimina un ordine
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID dell'ordine da eliminare
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Ordine eliminato con successo
 *       404:
 *         description: Ordine non trovato
 *       500:
 *         description: Errore interno del server
 */
router.delete("/:id", deleteOrder); 


export default router;