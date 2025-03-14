import express from "express";
import { 
  getAllSalePayments, 
  getSalePaymentById, 
  createSalePayment, 
  updateSalePayment, 
  deleteSalePayment 
} from "../controllers/salePaymentsController.js";


const router = express.Router();


/**
 * @swagger
 * tags:
 *   name: SalePayments
 *   description: API per la gestione dei pagamenti delle vendite
 */

/**
 * @swagger
 * /sale-payments:
 *   get:
 *     summary: Ottiene tutte le relazioni tra vendite e pagamenti
 *     tags: [SalePayments]
 *     responses:
 *       200:
 *         description: Lista di tutte le relazioni tra vendite e pagamenti
 *       500:
 *         description: Errore interno del server
 */
router.get("/", getAllSalePayments);          


/**
 * @swagger
 * /sale-payments/{id}:
 *   get:
 *     summary: Ottiene una relazione tra vendita e pagamento per ID
 *     tags: [SalePayments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID della relazione tra vendita e pagamento
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Dettagli della relazione richiesta
 *       404:
 *         description: Relazione non trovata
 *       500:
 *         description: Errore interno del server
 */
router.get("/:id", getSalePaymentById);      

/**
 * @swagger
 * /sale-payments:
 *   post:
 *     summary: Crea una nuova relazione tra vendita e pagamento
 *     tags: [SalePayments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - sale_id
 *               - payment_id
 *             properties:
 *               sale_id:
 *                 type: integer
 *                 description: ID della vendita
 *               payment_id:
 *                 type: integer
 *                 description: ID del pagamento
 *     responses:
 *       201:
 *         description: Relazione creata con successo
 *       400:
 *         description: Dati non validi
 *       500:
 *         description: Errore interno del server
 */
router.post("/", createSalePayment);        


/**
 * @swagger
 * /sale-payments/{id}:
 *   put:
 *     summary: Aggiorna una relazione tra vendita e pagamento esistente
 *     tags: [SalePayments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID della relazione da aggiornare
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - sale_id
 *               - payment_id
 *             properties:
 *               sale_id:
 *                 type: integer
 *                 description: ID della vendita
 *               payment_id:
 *                 type: integer
 *                 description: ID del pagamento
 *     responses:
 *       200:
 *         description: Relazione aggiornata con successo
 *       400:
 *         description: Dati non validi
 *       404:
 *         description: Relazione non trovata
 *       500:
 *         description: Errore interno del server
 */
router.put("/:id", updateSalePayment);     


/**
 * @swagger
 * /sale-payments/{id}:
 *   delete:
 *     summary: Elimina una relazione tra vendita e pagamento
 *     tags: [SalePayments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID della relazione da eliminare
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Relazione eliminata con successo
 *       404:
 *         description: Relazione non trovata
 *       500:
 *         description: Errore interno del server
 */
router.delete("/:id", deleteSalePayment);  


export default router;