import express from "express";
import { 
  getAllSales, 
  getSaleById, 
  createSale, 
  updateSale, 
  deleteSale 
} from "../controllers/salesController.js";


const router = express.Router();


/**
 * @swagger
 * tags:
 *   name: Sales
 *   description: API per la gestione delle vendite
 */

/**
 * @swagger
 * /sales:
 *   get:
 *     summary: Ottiene tutte le vendite
 *     tags: [Sales]
 *     responses:
 *       200:
 *         description: Lista di tutte le vendite
 *       500:
 *         description: Errore interno del server
 */
router.get("/", getAllSales);    


/**
 * @swagger
 * /sales/{id}:
 *   get:
 *     summary: Ottiene una vendita per ID
 *     tags: [Sales]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID della vendita
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Dettagli della vendita richiesta
 *       404:
 *         description: Vendita non trovata
 *       500:
 *         description: Errore interno del server
 */
router.get("/:id", getSaleById);   


/**
 * @swagger
 * /sales:
 *   post:
 *     summary: Crea una nuova vendita
 *     tags: [Sales]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - tax
 *               - online
 *               - payment_id
 *               - order_id
 *             properties:
 *               date:
 *                 type: string
 *                 format: date-time
 *                 description: Data e ora della vendita
 *               tax:
 *                 type: number
 *                 format: float
 *                 description: Importo della tassa
 *               online:
 *                 type: boolean
 *                 description: Indica se la vendita è online (true se è online, false se non lo è)
 *               note:
 *                 type: string
 *                 description: Note aggiuntive sulla vendita
 *               payment_id:
 *                 type: integer
 *                 description: ID del pagamento associato alla vendita
 *               order_id:
 *                 type: integer
 *                 description: ID dell'ordine associato alla vendita
 *     responses:
 *       201:
 *         description: Vendita creata con successo
 *       400:
 *         description: Dati non validi
 *       500:
 *         description: Errore interno del server
 */
router.post("/", createSale);   


/**
 * @swagger
 * /sales/{id}:
 *   put:
 *     summary: Aggiorna una vendita esistente
 *     tags: [Sales]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID della vendita da aggiornare
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
 *                 description: Data e ora della vendita aggiornata
 *               tax:
 *                 type: number
 *                 format: float
 *                 description: Importo della tassa aggiornata
 *               online:
 *                 type: boolean
 *                 description: Indica se la vendita è online (true se è online, false se non lo è)
 *               note:
 *                 type: string
 *                 description: Note aggiornate sulla vendita
 *               payment_id:
 *                 type: integer
 *                 description: ID del pagamento aggiornato associato alla vendita
 *               order_id:
 *                 type: integer
 *                 description: ID dell'ordine aggiornato associato alla vendita
 *     responses:
 *       200:
 *         description: Vendita aggiornata con successo
 *       400:
 *         description: Dati non validi
 *       404:
 *         description: Vendita non trovata
 *       500:
 *         description: Errore interno del server
 */
router.put("/:id", updateSale);  


/**
 * @swagger
 * /sales/{id}:
 *   delete:
 *     summary: Elimina una vendita
 *     tags: [Sales]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID della vendita da eliminare
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Vendita eliminata con successo
 *       404:
 *         description: Vendita non trovata
 *       500:
 *         description: Errore interno del server
 */
router.delete("/:id", deleteSale);


export default router;