import express from "express";
import {
    getAllCompanySuppliers,
    getCompanySupplierById,
    createCompanySupplier,
    updateCompanySupplier,
    deleteCompanySupplier
} from "../controllers/companySupplierController.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Company-Supplier
 *   description: API per la gestione della relazione tra aziende e fornitori
 */

/**
 * @swagger
 * /company-supplier:
 *   get:
 *     summary: Ottiene tutte le relazioni tra aziende e fornitori
 *     tags: [Company-Supplier]
 *     responses:
 *       200:
 *         description: Lista delle relazioni
 *       500:
 *         description: Errore interno del server
 */
router.get("/", getAllCompanySuppliers);


/**
 * @swagger
 * /company-supplier/{id}:
 *   get:
 *     summary: Ottiene una relazione azienda-fornitore per ID
 *     tags: [Company-Supplier]
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
router.get("/:id", getCompanySupplierById);


/**
 * @swagger
 * /company-supplier:
 *   post:
 *     summary: Crea una nuova relazione azienda-fornitore
 *     tags: [Company-Supplier]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               company_id:
 *                 type: integer
 *               supplier_id:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Relazione creata con successo
 *       400:
 *         description: Dati non validi
 *       500:
 *         description: Errore interno del server
 */
router.post("/", createCompanySupplier); 


/**
 * @swagger
 * /company-supplier/{id}:
 *   put:
 *     summary: Aggiorna un'associazione tra azienda e fornitore
 *     tags: [CompanySupplier]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID dell'associazione da aggiornare
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
 *               supplier_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Associazione aggiornata con successo
 *       400:
 *         description: Dati non validi
 *       404:
 *         description: Associazione non trovata
 *       500:
 *         description: Errore interno del server
 */
router.put("/:id", updateCompanySupplier);


/**
 * @swagger
 * /company-supplier/{id}:
 *   delete:
 *     summary: Elimina un'associazione tra azienda e fornitore
 *     tags: [CompanySupplier]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID dell'associazione da eliminare
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Associazione eliminata con successo
 *       404:
 *         description: Associazione non trovata
 *       500:
 *         description: Errore interno del server
 */
router.delete("/:id", deleteCompanySupplier); // Elimina un'associazione

export default router;