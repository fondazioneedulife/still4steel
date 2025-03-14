import express from "express";
import {
    getAllLogs,
    getLogById,
    createLog,
} from "../controllers/logsController.js";

const router = express.Router();


/**
 * @swagger
 * tags:
 *   name: Logs
 *   description: API per la gestione dei log delle azioni
 */

/**
 * @swagger
 * /logs:
 *   get:
 *     summary: Ottiene tutti i log
 *     tags: [Logs]
 *     responses:
 *       200:
 *         description: Lista di tutti i log
 *       500:
 *         description: Errore interno del server
 */
router.get("/", getAllLogs);


/**
 * @swagger
 * /logs/{id}:
 *   get:
 *     summary: Ottiene un log per ID
 *     tags: [Logs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del log
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Dettagli del log richiesto
 *       404:
 *         description: Log non trovato
 *       500:
 *         description: Errore interno del server
 */
router.get("/:id", getLogById); 


/**
 * @swagger
 * /logs:
 *   post:
 *     summary: Crea un nuovo log
 *     tags: [Logs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - action
 *               - company_id
 *             properties:
 *               action:
 *                 type: string
 *                 description: Descrizione breve dell'azione eseguita
 *               description:
 *                 type: string
 *                 description: Descrizione dettagliata dell'azione
 *               company_id:
 *                 type: integer
 *                 description: ID dell'azienda associata al log
 *     responses:
 *       201:
 *         description: Log creato con successo
 *       400:
 *         description: Dati non validi
 *       500:
 *         description: Errore interno del server
 */
router.post("/", createLog); 


export default router;