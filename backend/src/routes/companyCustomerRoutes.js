import express from "express";
import {
    getCompanyCustomers,
    getCompanyCustomerById,
    createCompanyCustomer,
    deleteCompanyCustomer
} from "../controllers/company_customerController.js";

const router = express.Router();


/**
 * @swagger
 * tags:
 *   name: Company-Customer
 *   description: API per la gestione della relazione tra aziende e clienti
 */

/**
 * @swagger
 * /company-customers:
 *   get:
 *     summary: Ottiene tutte le relazioni tra aziende e clienti
 *     tags: [Company-Customer]
 *     responses:
 *       200:
 *         description: Lista delle relazioni
 *       500:
 *         description: Errore interno del server
 */
router.get("/", getCompanyCustomers);


/**
 * @swagger
 * /company-customers/{id}:
 *   get:
 *     summary: Ottiene una relazione azienda-cliente per ID
 *     tags: [Company-Customer]
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
 *     tags: [Company-Customer]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               company_id:
 *                 type: integer
 *               customer_id:
 *                 type: integer
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
 *   delete:
 *     summary: Elimina una relazione azienda-cliente
 *     tags: [Company-Customer]
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