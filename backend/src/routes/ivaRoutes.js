import express from "express";
import { 
    getAllIvas, 
    getIvaById, 
    createIva, 
    updateIva, 
    deleteIva 
} from "../controllers/ivaController.js";


const router = express.Router();


/**
 * @swagger
 * tags:
 *   name: IVA
 *   description: API per la gestione delle aliquote IVA
 */

/**
 * @swagger
 * /iva:
 *   get:
 *     summary: Ottiene tutte le aliquote IVA
 *     tags: [IVA]
 *     responses:
 *       200:
 *         description: Lista di tutte le aliquote IVA
 *       500:
 *         description: Errore interno del server
 */
router.get("/", getAllIvas);


/**
 * @swagger
 * /iva/{id}:
 *   get:
 *     summary: Ottiene un'aliquota IVA per ID
 *     tags: [IVA]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID dell'aliquota IVA
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Dettagli dell'aliquota IVA richiesta
 *       404:
 *         description: Aliquota IVA non trovata
 *       500:
 *         description: Errore interno del server
 */
router.get("/:id", getIvaById);


/**
 * @swagger
 * /iva:
 *   post:
 *     summary: Crea una nuova aliquota IVA
 *     tags: [IVA]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - rate
 *             properties:
 *               rate:
 *                 type: number
 *                 format: float
 *                 description: Percentuale dell'aliquota IVA
 *               description:
 *                 type: string
 *                 description: Descrizione dell'aliquota IVA
 *     responses:
 *       201:
 *         description: Aliquota IVA creata con successo
 *       400:
 *         description: Dati non validi
 *       500:
 *         description: Errore interno del server
 */
router.post("/", createIva);


/**
 * @swagger
 * /iva/{id}:
 *   put:
 *     summary: Aggiorna un'aliquota IVA esistente
 *     tags: [IVA]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID dell'aliquota IVA da aggiornare
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rate:
 *                 type: number
 *                 format: float
 *                 description: Percentuale aggiornata dell'aliquota IVA
 *               description:
 *                 type: string
 *                 description: Descrizione aggiornata dell'aliquota IVA
 *     responses:
 *       200:
 *         description: Aliquota IVA aggiornata con successo
 *       400:
 *         description: Dati non validi
 *       404:
 *         description: Aliquota IVA non trovata
 *       500:
 *         description: Errore interno del server
 */
router.put("/:id", updateIva);


/**
 * @swagger
 * /iva/{id}:
 *   delete:
 *     summary: Elimina un'aliquota IVA
 *     tags: [IVA]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID dell'aliquota IVA da eliminare
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Aliquota IVA eliminata con successo
 *       404:
 *         description: Aliquota IVA non trovata
 *       500:
 *         description: Errore interno del server
 */
router.delete("/:id", deleteIva);


export default router;