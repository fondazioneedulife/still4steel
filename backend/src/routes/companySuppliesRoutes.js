import express from "express";
import { 
  getAllCompanySupplies, 
  getCompanySupplyById, 
  createCompanySupply, 
  updateCompanySupply, 
  deleteCompanySupply 
} from "../controllers/companySuppliesController.js";


const router = express.Router();


/**
 * @swagger
 * tags:
 *   name: CompanySupplies
 *   description: API per la gestione della relazione tra aziende e forniture
 */


/**
 * @swagger
 * /company-supplies:
 *   get:
 *     summary: Ottiene tutte le relazioni tra aziende e forniture
 *     tags: [CompanySupplies]
 *     responses:
 *       200:
 *         description: Lista delle relazioni
 *       500:
 *         description: Errore interno del server
 */
router.get("/", getAllCompanySupplies);      


/**
 * @swagger
 * /company-supplies/{id}:
 *   get:
 *     summary: Ottiene una relazione azienda-fornitura per ID
 *     tags: [CompanySupplies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID della relazione
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Dati della relazione richiesta
 *       404:
 *         description: Relazione non trovata
 *       500:
 *         description: Errore interno del server
 */
router.get("/:id", getCompanySupplyById); 


/**
 * @swagger
 * /company-supplies:
 *   post:
 *     summary: Crea una nuova relazione tra azienda e fornitura
 *     tags: [CompanySupplies]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - company_id
 *               - supply_id
 *             properties:
 *               company_id:
 *                 type: integer
 *                 description: ID dell'azienda
 *               supply_id:
 *                 type: integer
 *                 description: ID della fornitura
 *     responses:
 *       201:
 *         description: Relazione creata con successo
 *       400:
 *         description: Dati non validi
 *       500:
 *         description: Errore interno del server
 */
router.post("/", createCompanySupply);   


/**
 * @swagger
 * /company-supplies/{id}:
 *   put:
 *     summary: Aggiorna una relazione tra azienda e fornitura
 *     tags: [CompanySupplies]
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
 *             properties:
 *               company_id:
 *                 type: integer
 *                 description: Nuovo ID dell'azienda
 *               supply_id:
 *                 type: integer
 *                 description: Nuovo ID della fornitura
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
router.put("/:id", updateCompanySupply);  


/**
 * @swagger
 * /company-supplies/{id}:
 *   delete:
 *     summary: Elimina una relazione tra azienda e fornitura
 *     tags: [CompanySupplies]
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
router.delete("/:id", deleteCompanySupply); 


export default router;