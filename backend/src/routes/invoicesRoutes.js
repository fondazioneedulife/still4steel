import express from "express";
import {
    getAllInvoices,
    getInvoiceById,
    createInvoice,
    updateInvoice,
    deleteInvoice
} from "../controllers/invoicesController.js";


const router = express.Router();


/**
 * @swagger
 * tags:
 *   name: Invoices
 *   description: API per la gestione delle fatture
 */

/**
 * @swagger
 * /invoices:
 *   get:
 *     summary: Ottiene tutte le fatture
 *     tags: [Invoices]
 *     responses:
 *       200:
 *         description: Lista di tutte le fatture
 *       500:
 *         description: Errore interno del server
 */
router.get("/", getAllInvoices);


/**
 * @swagger
 * /invoices/{id}:
 *   get:
 *     summary: Ottiene una fattura per ID
 *     tags: [Invoices]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID della fattura
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Dettagli della fattura richiesta
 *       404:
 *         description: Fattura non trovata
 *       500:
 *         description: Errore interno del server
 */
router.get("/:id", getInvoiceById); 


/**
 * @swagger
 * /invoices:
 *   post:
 *     summary: Crea una nuova fattura
 *     tags: [Invoices]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - type
 *               - state
 *             properties:
 *               date:
 *                 type: string
 *                 format: date-time
 *                 description: Data della fattura (opzionale, di default la data corrente)
 *               type:
 *                 type: string
 *                 description: Tipo di fattura
 *               description:
 *                 type: string
 *                 description: Descrizione della fattura
 *               state:
 *                 type: boolean
 *                 description: Stato della fattura (true per attiva, false per annullata)
 *               note:
 *                 type: string
 *                 description: Note aggiuntive sulla fattura
 *     responses:
 *       201:
 *         description: Fattura creata con successo
 *       400:
 *         description: Dati non validi
 *       500:
 *         description: Errore interno del server
 */
router.post("/", createInvoice);


/**
 * @swagger
 * /invoices/{id}:
 *   put:
 *     summary: Aggiorna una fattura esistente
 *     tags: [Invoices]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID della fattura da aggiornare
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               date:
 *                 type: string
 *                 format: date-time
 *                 description: Data aggiornata della fattura
 *               type:
 *                 type: string
 *                 description: Tipo aggiornato della fattura
 *               description:
 *                 type: string
 *                 description: Descrizione aggiornata
 *               state:
 *                 type: boolean
 *                 description: Stato aggiornato della fattura
 *               note:
 *                 type: string
 *                 description: Note aggiornate sulla fattura
 *     responses:
 *       200:
 *         description: Fattura aggiornata con successo
 *       400:
 *         description: Dati non validi
 *       404:
 *         description: Fattura non trovata
 *       500:
 *         description: Errore interno del server
 */
router.put("/:id", updateInvoice); 


/**
 * @swagger
 * /invoices/{id}:
 *   delete:
 *     summary: Elimina una fattura
 *     tags: [Invoices]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID della fattura da eliminare
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Fattura eliminata con successo
 *       404:
 *         description: Fattura non trovata
 *       500:
 *         description: Errore interno del server
 */
router.delete("/:id", deleteInvoice); 


export default router;