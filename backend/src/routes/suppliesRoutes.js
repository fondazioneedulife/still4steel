import express from "express";
import { 
  getAllSupplies, 
  getSupplyById, 
  createSupply, 
  updateSupply, 
  deleteSupply 
} from "../controllers/suppliesController.js";


const router = express.Router();


/**
 * @swagger
 * tags:
 *   name: Supplies
 *   description: API per la gestione delle forniture
 */

/**
 * @swagger
 * /supplies:
 *   get:
 *     summary: Ottiene tutte le forniture
 *     tags: [Supplies]
 *     responses:
 *       200:
 *         description: Lista di tutte le forniture
 *       500:
 *         description: Errore interno del server
 */
router.get("/", getAllSupplies);      


/**
 * @swagger
 * /supplies/{id}:
 *   get:
 *     summary: Ottiene una fornitura per ID
 *     tags: [Supplies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID della fornitura
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Dettagli della fornitura richiesta
 *       404:
 *         description: Fornitura non trovata
 *       500:
 *         description: Errore interno del server
 */
router.get("/:id", getSupplyById); 


/**
 * @swagger
 * /supplies:
 *   post:
 *     summary: Crea una nuova fornitura
 *     tags: [Supplies]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - code
 *               - state
 *               - supply_cost
 *               - product_id
 *               - supplier_id
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nome della fornitura
 *               code:
 *                 type: string
 *                 description: Codice univoco della fornitura
 *               date_release:
 *                 type: string
 *                 format: date-time
 *                 description: Data di rilascio della fornitura (opzionale, predefinita a CURRENT_TIMESTAMP)
 *               state:
 *                 type: boolean
 *                 description: Stato della fornitura (true = attivo, false = inattivo)
 *               supply_cost:
 *                 type: number
 *                 format: float
 *                 description: Costo della fornitura
 *               note:
 *                 type: string
 *                 description: Note sulla fornitura
 *               product_id:
 *                 type: integer
 *                 description: ID del prodotto associato alla fornitura
 *               supplier_id:
 *                 type: integer
 *                 description: ID del fornitore associato alla fornitura
 *     responses:
 *       201:
 *         description: Fornitura creata con successo
 *       400:
 *         description: Dati non validi
 *       500:
 *         description: Errore interno del server
 */
router.post("/", createSupply);    


/**
 * @swagger
 * /supplies/{id}:
 *   put:
 *     summary: Aggiorna una fornitura esistente
 *     tags: [Supplies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID della fornitura da aggiornare
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
 *                 description: Nome aggiornato della fornitura
 *               code:
 *                 type: string
 *                 description: Codice univoco aggiornato della fornitura
 *               date_release:
 *                 type: string
 *                 format: date-time
 *                 description: Data di rilascio aggiornata
 *               state:
 *                 type: boolean
 *                 description: Stato aggiornato della fornitura
 *               supply_cost:
 *                 type: number
 *                 format: float
 *                 description: Costo aggiornato della fornitura
 *               note:
 *                 type: string
 *                 description: Note aggiornate sulla fornitura
 *               product_id:
 *                 type: integer
 *                 description: ID aggiornato del prodotto associato
 *               supplier_id:
 *                 type: integer
 *                 description: ID aggiornato del fornitore associato
 *     responses:
 *       200:
 *         description: Fornitura aggiornata con successo
 *       400:
 *         description: Dati non validi
 *       404:
 *         description: Fornitura non trovata
 *       500:
 *         description: Errore interno del server
 */
router.put("/:id", updateSupply);  


/**
 * @swagger
 * /supplies/{id}:
 *   delete:
 *     summary: Elimina una fornitura
 *     tags: [Supplies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID della fornitura da eliminare
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Fornitura eliminata con successo
 *       404:
 *         description: Fornitura non trovata
 *       500:
 *         description: Errore interno del server
 */
router.delete("/:id", deleteSupply); 


export default router;