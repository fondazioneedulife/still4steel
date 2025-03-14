import express from "express";
import {
    getAllCompanySuppliers,
    getCompanySupplierById,
    createCompanySupplier,
    updateCompanySupplier,
    deleteCompanySupplier
} from "../controllers/companySuppliersController.js";


const router = express.Router();


/**
 * @swagger
 * tags:
 *   name: CompanySuppliers
 *   description: API per la gestione delle relazioni tra aziende e fornitori
 */


/**
 * @swagger
 * /company-suppliers:
 *   get:
 *     summary: Ottiene tutte le relazioni tra aziende e fornitori
 *     tags: [CompanySuppliers]
 *     responses:
 *       200:
 *         description: Lista delle relazioni
 *       500:
 *         description: Errore interno del server
 */
router.get("/", getAllCompanySuppliers);


/**
 * @swagger
 * /company-suppliers/{id}:
 *   get:
 *     summary: Ottiene una relazione azienda-fornitore per ID
 *     tags: [CompanySuppliers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID della relazione azienda-fornitore
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
 * /company-suppliers:
 *   post:
 *     summary: Crea una nuova relazione azienda-fornitore
 *     tags: [CompanySuppliers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - company_id
 *               - supplier_id
 *             properties:
 *               company_id:
 *                 type: integer
 *                 description: ID dell'azienda
 *               supplier_id:
 *                 type: integer
 *                 description: ID del fornitore
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
 * /company-suppliers/{id}:
 *   put:
 *     summary: Aggiorna una relazione esistente tra azienda e fornitore
 *     tags: [CompanySuppliers]
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
 *               supplier_id:
 *                 type: integer
 *                 description: Nuovo ID del fornitore
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
router.put("/:id", updateCompanySupplier);


/**
 * @swagger
 * /company-suppliers/{id}:
 *   delete:
 *     summary: Elimina una relazione tra azienda e fornitore
 *     tags: [CompanySuppliers]
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
router.delete("/:id", deleteCompanySupplier);


export default router;