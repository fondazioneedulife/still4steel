import express from "express";
import { 
  getAllSuppliers, 
  getSupplierById, 
  createSupplier, 
  updateSupplier, 
  deleteSupplier 
} from "../controllers/suppliersController.js";


const router = express.Router();


/**
 * @swagger
 * tags:
 *   name: Suppliers
 *   description: API per la gestione dei fornitori
 */

/**
 * @swagger
 * /suppliers:
 *   get:
 *     summary: Ottiene tutti i fornitori
 *     tags: [Suppliers]
 *     responses:
 *       200:
 *         description: Lista di tutti i fornitori
 *       500:
 *         description: Errore interno del server
 */
router.get("/", getAllSuppliers);


/**
 * @swagger
 * /suppliers/{id}:
 *   get:
 *     summary: Ottiene un fornitore per ID
 *     tags: [Suppliers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del fornitore
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Dettagli del fornitore richiesto
 *       404:
 *         description: Fornitore non trovato
 *       500:
 *         description: Errore interno del server
 */
router.get("/:id", getSupplierById);


/**
 * @swagger
 * /suppliers:
 *   post:
 *     summary: Crea un nuovo fornitore
 *     tags: [Suppliers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - first_name
 *               - last_name
 *             properties:
 *               first_name:
 *                 type: string
 *                 description: Nome del fornitore
 *               last_name:
 *                 type: string
 *                 description: Cognome del fornitore
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email del fornitore (deve essere univoca)
 *               phone:
 *                 type: string
 *                 description: Numero di telefono del fornitore
 *               note:
 *                 type: string
 *                 description: Note aggiuntive sul fornitore
 *     responses:
 *       201:
 *         description: Fornitore creato con successo
 *       400:
 *         description: Dati non validi
 *       500:
 *         description: Errore interno del server
 */
router.post("/", createSupplier);


/**
 * @swagger
 * /suppliers/{id}:
 *   put:
 *     summary: Aggiorna un fornitore esistente
 *     tags: [Suppliers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del fornitore da aggiornare
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               first_name:
 *                 type: string
 *                 description: Nome aggiornato del fornitore
 *               last_name:
 *                 type: string
 *                 description: Cognome aggiornato del fornitore
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email aggiornata del fornitore
 *               phone:
 *                 type: string
 *                 description: Numero di telefono aggiornato
 *               note:
 *                 type: string
 *                 description: Note aggiuntive aggiornate
 *     responses:
 *       200:
 *         description: Fornitore aggiornato con successo
 *       400:
 *         description: Dati non validi
 *       404:
 *         description: Fornitore non trovato
 *       500:
 *         description: Errore interno del server
 */
router.put("/:id", updateSupplier);


/**
 * @swagger
 * /suppliers/{id}:
 *   delete:
 *     summary: Elimina un fornitore
 *     tags: [Suppliers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del fornitore da eliminare
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Fornitore eliminato con successo
 *       404:
 *         description: Fornitore non trovato
 *       500:
 *         description: Errore interno del server
 */
router.delete("/:id", deleteSupplier);


export default router;