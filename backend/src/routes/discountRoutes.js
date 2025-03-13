import express from "express";
import { 
    getAllDiscounts, 
    getDiscountById, 
    createDiscount, 
    updateDiscount, 
    deleteDiscount 
} from "../controllers/discountController.js";


const router = express.Router();


/**
 * @swagger
 * tags:
 *   name: Discounts
 *   description: API per la gestione degli sconti
 */


/**
 * @swagger
 * /discounts:
 *   get:
 *     summary: Ottiene tutti gli sconti
 *     tags: [Discounts]
 *     responses:
 *       200:
 *         description: Lista di tutti gli sconti
 *       500:
 *         description: Errore interno del server
 */
router.get("/", getAllDiscounts);


/**
 * @swagger
 * /discounts/{id}:
 *   get:
 *     summary: Ottiene uno sconto per ID
 *     tags: [Discounts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID dello sconto da recuperare
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Dettagli dello sconto richiesto
 *       404:
 *         description: Sconto non trovato
 *       500:
 *         description: Errore interno del server
 */
router.get("/:id", getDiscountById);


/**
 * @swagger
 * /discounts:
 *   post:
 *     summary: Crea un nuovo sconto
 *     tags: [Discounts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - type
 *               - value
 *               - date_start
 *               - date_end
 *               - state
 *             properties:
 *               type:
 *                 type: string
 *                 description: Tipo di sconto
 *               value:
 *                 type: number
 *                 format: float
 *                 description: Valore dello sconto (deve essere maggiore di 0)
 *               date_start:
 *                 type: string
 *                 format: date-time
 *                 description: Data di inizio dello sconto
 *               date_end:
 *                 type: string
 *                 format: date-time
 *                 description: Data di fine dello sconto
 *               state:
 *                 type: string
 *                 enum: [attivo, scaduto, inattivo]
 *                 description: Stato dello sconto
 *               description:
 *                 type: string
 *                 description: Descrizione opzionale dello sconto
 *               note:
 *                 type: string
 *                 description: Note opzionali sullo sconto
 *     responses:
 *       201:
 *         description: Sconto creato con successo
 *       400:
 *         description: Dati non validi
 *       500:
 *         description: Errore interno del server
 */
router.post("/", createDiscount);


/**
 * @swagger
 * /discounts/{id}:
 *   put:
 *     summary: Aggiorna uno sconto esistente
 *     tags: [Discounts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID dello sconto da aggiornare
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *                 description: Tipo di sconto aggiornato
 *               value:
 *                 type: number
 *                 format: float
 *                 description: Valore dello sconto aggiornato
 *               date_start:
 *                 type: string
 *                 format: date-time
 *                 description: Data di inizio aggiornata
 *               date_end:
 *                 type: string
 *                 format: date-time
 *                 description: Data di fine aggiornata
 *               state:
 *                 type: string
 *                 enum: [attivo, scaduto, inattivo]
 *                 description: Stato aggiornato dello sconto
 *               description:
 *                 type: string
 *                 description: Descrizione aggiornata dello sconto
 *               note:
 *                 type: string
 *                 description: Note aggiornate sullo sconto
 *     responses:
 *       200:
 *         description: Sconto aggiornato con successo
 *       400:
 *         description: Dati non validi
 *       404:
 *         description: Sconto non trovato
 *       500:
 *         description: Errore interno del server
 */
router.put("/:id", updateDiscount);


/**
 * @swagger
 * /discounts/{id}:
 *   delete:
 *     summary: Elimina uno sconto
 *     tags: [Discounts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID dello sconto da eliminare
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Sconto eliminato con successo
 *       404:
 *         description: Sconto non trovato
 *       500:
 *         description: Errore interno del server
 */
router.delete("/:id", deleteDiscount);


export default router;