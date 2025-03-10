import express from "express";
import {
  createRender,
  getRenders,
  getRenderById,
  updateRender,
  deleteRender
} from "../controllers/rendersController.js";

const router = express.Router();


/**
 * @swagger
 * tags:
 *   name: Renders
 *   description: API per la gestione dei resi
 */

/**
 * @swagger
 * /renders:
 *   get:
 *     summary: Ottieni tutti i resi
 *     tags: [Renders]
 *     responses:
 *       200:
 *         description: Lista di tutti i resi
 *       500:
 *         description: Errore interno del server
 */
router.get("/", getRenders);       

/**
 * @swagger
 * /renders/{id}:
 *   get:
 *     summary: Ottiene un reso per ID
 *     tags: [Renders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID dei resi
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Dettagli del reso richiesto
 *       404:
 *         description: Reso non trovato
 *       500:
 *         description: Errore interno del server
 */
router.get("/:id", getRenderById);


/**
 * @swagger
 * /renders:
 *   post:
 *     summary: Crea un nuovo reso
 *     tags: [Renders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Reso creato con successo
 *       400:
 *         description: Dati non validi
 *       500:
 *         description: Errore interno del server
 */
router.post("/", createRender);     


/**
 * @swagger
 * /renders/{id}:
 *   put:
 *     summary: Aggiorna un reso esistente
 *     tags: [Renders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del reso da aggiornare
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Reso aggiornato con successo
 *       400:
 *         description: Dati non validi
 *       404:
 *         description: Reso non trovato
 *       500:
 *         description: Errore interno del server
 */
router.put("/:id", updateRender);   


/**
 * @swagger
 * /renders/{id}:
 *   delete:
 *     summary: Elimina un reso
 *     tags: [Renders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del reso da eliminare
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Reso eliminato con successo
 *       404:
 *         description: Reso non trovato
 *       500:
 *         description: Errore interno del server
 */
router.delete("/:id", deleteRender);

export default router;