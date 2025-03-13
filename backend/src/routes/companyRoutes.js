import express from "express";
import { 
    getAllCompanies, 
    getCompanyById, 
    createCompany, 
    updateCompany, 
    deleteCompany 
} from "../controllers/companyController.js";
import { 
    authenticateUser, 
    validateCompanyData 
} from "../middlewares/middleware.js";


const router = express.Router();


/**
 * @swagger
 * tags:
 *   name: Companies
 *   description: API per la gestione delle aziende
 */


/**
 * @swagger
 * /companies:
 *   get:
 *     summary: Ottiene tutte le aziende
 *     tags: [Companies]
 *     responses:
 *       200:
 *         description: Lista di tutte le aziende
 *       500:
 *         description: Errore interno del server
 */
router.get("/", getAllCompanies);


/**
 * @swagger
 * /companies/{id}:
 *   get:
 *     summary: Ottieni i dettagli di un'azienda per ID
 *     tags: [Companies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID dell'azienda
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Dettagli dell'azienda richiesta
 *       404:
 *         description: Azienda non trovata
 *       500:
 *         description: Errore interno del server
 */
router.get("/:id", authenticateUser, getCompanyById);


/**
 * @swagger
 * /companies:
 *   post:
 *     summary: Crea una nuova azienda
 *     tags: [Companies]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - vat
 *               - tax_code
 *               - email
 *               - address
 *               - password
 *               - password_confirm
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nome dell'azienda
 *               vat:
 *                 type: string
 *                 description: Partita IVA dell'azienda
 *               tax_code:
 *                 type: string
 *                 description: Codice fiscale dell'azienda
 *               phone:
 *                 type: string
 *                 description: Numero di telefono dell'azienda
 *               email:
 *                 type: string
 *                 description: Email dell'azienda
 *               address:
 *                 type: string
 *                 description: Indirizzo dell'azienda
 *               password:
 *                 type: string
 *                 description: Password dell'azienda
 *               password_confirm:
 *                 type: string
 *                 description: Conferma della password
 *               note:
 *                 type: string
 *                 description: Note aggiuntive sull'azienda      
 *     responses:
 *       201:
 *         description: Azienda creata con successo
 *       400:
 *         description: Dati non validi o password non corrispondenti
 *       500:
 *         description: Errore interno del server
 */
router.post("/", authenticateUser, validateCompanyData, createCompany);


/**
 * @swagger
 * /companies/{id}:
 *   put:
 *     summary: Aggiorna un'azienda esistente
 *     tags: [Companies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nome aggiornato dell'azienda
 *               vat:
 *                 type: string
 *                 description: Partita IVA aggiornata dell'azienda
 *               tax_code:
 *                 type: string
 *                 description: Codice fiscale aggiornato
 *               phone:
 *                 type: string
 *                 description: Numero di telefono aggiornato
 *               email:
 *                 type: string
 *                 description: Email aggiornata dell'azienda
 *               address:
 *                 type: string
 *                 description: Indirizzo aggiornato dell'azienda
 *               password:
 *                 type: string
 *                 description: Nuova password dell'azienda
 *               password_confirm:
 *                 type: string
 *                 description: Conferma della nuova password
 *               note:
 *                 type: string
 *                 description: Note aggiornate sull'azienda
 *     responses:
 *       200:
 *         description: Azienda aggiornata con successo
 *       400:
 *         description: Dati non validi
 *       404:
 *         description: Azienda non trovata
 *       500:
 *         description: Errore interno del server
 */
router.put("/:id", authenticateUser, updateCompany);


/**
 * @swagger
 * /companies/{id}:
 *   delete:
 *     summary: Elimina un'azienda
 *     tags: [Companies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Azienda eliminata con successo
 *       404:
 *         description: Azienda non trovata
 *       500:
 *         description: Errore interno del server
 */
router.delete("/:id", authenticateUser, deleteCompany);


export default router;