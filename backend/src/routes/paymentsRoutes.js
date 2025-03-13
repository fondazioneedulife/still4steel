import express from "express";
import {
    getAllPayments,
    getPaymentById,
    createPayment,
    updatePayment,
    deletePayment
} from "../controllers/paymentsController.js";


const router = express.Router();


/**
 * @swagger
 * tags:
 *   name: Payments
 *   description: API per la gestione dei pagamenti
 */

/**
 * @swagger
 * /payments:
 *   get:
 *     summary: Ottiene tutti i pagamenti
 *     tags: [Payments]
 *     responses:
 *       200:
 *         description: Lista di tutti i pagamenti
 *       500:
 *         description: Errore interno del server
 */
router.get("/", getAllPayments); 


/**
 * @swagger
 * /payments/{id}:
 *   get:
 *     summary: Ottiene un pagamento per ID
 *     tags: [Payments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del pagamento
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Dettagli del pagamento richiesto
 *       404:
 *         description: Pagamento non trovato
 *       500:
 *         description: Errore interno del server
 */
router.get("/:id", getPaymentById); 


/**
 * @swagger
 * /payments:
 *   post:
 *     summary: Crea un nuovo pagamento
 *     tags: [Payments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - date_start
 *               - date_end
 *               - method
 *               - state
 *             properties:
 *               date_start:
 *                 type: string
 *                 format: date-time
 *                 description: Data e ora di inizio del pagamento
 *               date_end:
 *                 type: string
 *                 format: date-time
 *                 description: Data e ora di fine del pagamento
 *               method:
 *                 type: string
 *                 description: Metodo di pagamento (ad esempio, "carta di credito", "bonifico")
 *               state:
 *                 type: string
 *                 description: Stato del pagamento ("in attesa", "completato", "fallito", "annullato")
 *               note:
 *                 type: string
 *                 description: Eventuali note aggiuntive sul pagamento
 *     responses:
 *       201:
 *         description: Pagamento creato con successo
 *       400:
 *         description: Dati non validi
 *       500:
 *         description: Errore interno del server
 */
router.post("/", createPayment); 


/**
 * @swagger
 * /payments/{id}:
 *   put:
 *     summary: Aggiorna un pagamento esistente
 *     tags: [Payments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del pagamento da aggiornare
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               date_start:
 *                 type: string
 *                 format: date-time
 *                 description: Data e ora di inizio aggiornata del pagamento
 *               date_end:
 *                 type: string
 *                 format: date-time
 *                 description: Data e ora di fine aggiornata del pagamento
 *               method:
 *                 type: string
 *                 description: Metodo di pagamento aggiornato
 *               state:
 *                 type: string
 *                 description: Stato aggiornato del pagamento
 *               note:
 *                 type: string
 *                 description: Eventuali note aggiornate
 *     responses:
 *       200:
 *         description: Pagamento aggiornato con successo
 *       400:
 *         description: Dati non validi
 *       404:
 *         description: Pagamento non trovato
 *       500:
 *         description: Errore interno del server
 */
router.put("/:id", updatePayment); 


/**
 * @swagger
 * /payments/{id}:
 *   delete:
 *     summary: Elimina un pagamento
 *     tags: [Payments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del pagamento da eliminare
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Pagamento eliminato con successo
 *       404:
 *         description: Pagamento non trovato
 *       500:
 *         description: Errore interno del server
 */
router.delete("/:id", deletePayment);

export default router;