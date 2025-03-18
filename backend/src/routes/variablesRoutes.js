import express from "express";
import { 
    getAllVariables,
    getVariableById,
    createVariable,
    updateVariable,
    deleteVariable
} from "../controllers/variablesController.js";

const router = express.Router();


/**
 * @swagger
 * tags:
 *   name: Variables
 *   description: API per la gestione delle variabili
 */


/**
 * @swagger
 * /Variables:
 *   get:
 *     summary: Ottiene tutte le variabili
 *     tags: [Variables]
 *     responses:
 *       200:
 *         description: Lista di tutte le variabili
 *       500:
 *         description: Errore interno del server
 */
router.get("/", getAllVariables);


/**
 * @swagger
 * /Variables/{id}:
 *   get:
 *     summary: Ottiene una variabile per ID
 *     tags: [Variables]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID della variabile
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Dettagli della variabile richiesta
 *       404:
 *         description: variabile non trovata
 *       500:
 *         description: Errore interno del server
 */
router.get("/:id", getVariableById);


/**
 * @swagger
 * /Variables:
 *   post:
 *     summary: Crea una nuova variabile
 *     tags: [Variables]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - type
 *               - product_id
 *             properties:
 *               type:
 *                 type: string
 *                 description: Tipo della variabile
 *               product_id:
 *                 type: integer
 *                 description: ID del prodotto associato
 *     responses:
 *       201:
 *         description: variabile creata con successo
 *       400:
 *         description: Dati non validi
 *       500:
 *         description: Errore interno del server
 */
router.post("/", createVariable);


/**
 * @swagger
 * /Variables/{id}:
 *   put:
 *     summary: Aggiorna una variabile esistente
 *     tags: [Variables]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID della variabile da aggiornare
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
 *                 description: Tipo aggiornato della variabile
 *               product_id:
 *                 type: integer
 *                 description: ID aggiornato del prodotto associato
 *     responses:
 *       200:
 *         description: variabile aggiornata con successo
 *       400:
 *         description: Dati non validi
 *       404:
 *         description: variabile non trovata
 *       500:
 *         description: Errore interno del server
 */
router.put("/:id", updateVariable);


/**
 * @swagger
 * /Variables/{id}:
 *   delete:
 *     summary: Elimina una variabile
 *     tags: [Variables]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID della variabile da eliminare
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: variabile eliminata con successo
 *       404:
 *         description: variabile non trovata
 *       500:
 *         description: Errore interno del server
 */
router.delete("/:id", deleteVariable);


export default router;