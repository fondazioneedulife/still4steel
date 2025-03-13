import express from "express";
import { 
    getAllCompanyCustomers, 
    getCompanyCustomerById, 
    createCompanyCustomer, 
    updateCompanyCustomer,
    deleteCompanyCustomer 
} from "../controllers/companyCustomerController.js";


const router = express.Router();


/**
 * @swagger
 * tags:
 *   name: CompanyCustomers
 *   description: API per la gestione della relazione tra aziende e clienti
 */


/**
 * @swagger
 * /company-customers:
 *   get:
 *     summary: Ottiene tutte le relazioni tra aziende e clienti
 *     tags: [CompanyCustomers]
 *     responses:
 *       200:
 *         description: Lista delle relazioni
 *       500:
 *         description: Errore interno del server
 */
router.get("/", getAllCompanyCustomers);


/**
 * @swagger
 * /company-customers/{id}:
 *   get:
 *     summary: Ottiene una relazione azienda-cliente per ID
 *     tags: [CompanyCustomers]
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
router.get("/:id", getCompanyCustomerById);


/**
 * @swagger
 * /company-customers:
 *   post:
 *     summary: Crea una nuova relazione azienda-cliente
 *     tags: [CompanyCustomers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - company_id
 *               - customer_id
 *             properties:
 *               company_id:
 *                 type: integer
 *                 description: ID dell'azienda
 *               customer_id:
 *                 type: integer
 *                 description: ID del cliente
 *     responses:
 *       201:
 *         description: Relazione creata con successo
 *       400:
 *         description: Dati non validi
 *       500:
 *         description: Errore interno del server
 */
router.post("/", createCompanyCustomer);


/**
 * @swagger
 * /company-customers/{id}:
 *   put:
 *     summary: Aggiorna una relazione tra azienda e cliente esistente
 *     tags: [CompanyCustomers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID della relazione da aggiornare
 *         schema:
 *           type: object
 *           required:
 *             - company_id
 *             - customer_id
 *           properties:
 *             company_id:
 *               type: integer
 *               description: ID dell'azienda
 *             customer_id:
 *               type: integer
 *               description: ID del cliente
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
router.put("/:id", updateCompanyCustomer);


/**
 * @swagger
 * /company-customers/{id}:
 *   delete:
 *     summary: Elimina una relazione azienda-cliente
 *     tags: [CompanyCustomers]
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
router.delete("/:id", deleteCompanyCustomer);


export default router;