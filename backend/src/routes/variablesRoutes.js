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
 * /Variabiles:
 *   get:
 *     summary: Ottiene tutti le variabili
 *     tags: [Variabiles]
 *     responses:
 *       200:
 *         description: Lista di tutti le variabili
 *       500:
 *         description: Errore interno del server
 */
router.get("/", getAllVariables);


/**
 * @swagger
 * /Variabiles/{id}:
 *   get:
 *     summary: Ottiene un variabile per ID
 *     tags: [Variabiles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID della variabile
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Dettagli della variabile richiesto
 *       404:
 *         description: variabile non trovato
 *       500:
 *         description: Errore interno del server
 */
router.get("/:id", getVariableById);


/**
 * @swagger
 * /Variabiles:
 *   post:
 *     summary: Crea una nuova variabile
 *     tags: [Variabiles]
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
 *         description: variabile creato con successo
 *       400:
 *         description: Dati non validi
 *       500:
 *         description: Errore interno del server
 */
router.post("/", createVariable);


/**
 * @swagger
 * /Variabiles/{id}:
 *   put:
 *     summary: Aggiorna un variabile esistente
 *     tags: [Variabiles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del variabile da aggiornare
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
 *         description: variabile aggiornato con successo
 *       400:
 *         description: Dati non validi
 *       404:
 *         description: variabile non trovato
 *       500:
 *         description: Errore interno del server
 */
router.put("/:id", updateVariable);


/**
 * @swagger
 * /Variabiles/{id}:
 *   delete:
 *     summary: Elimina un variabile
 *     tags: [Variabiles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del variabile da eliminare
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: variabile eliminato con successo
 *       404:
 *         description: variabile non trovato
 *       500:
 *         description: Errore interno del server
 */
router.delete("/:id", deleteVariable);


export default router;