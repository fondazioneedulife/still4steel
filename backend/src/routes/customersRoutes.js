import express from "express";
import { 
    getAllCustomers, 
    getCustomerById, 
    createCustomer, 
    updateCustomer, 
    deleteCustomer 
} from "../controllers/customersController.js";


const router = express.Router();


/**
 * @swagger
 * tags:
 *   name: Customers
 *   description: API per la gestione dei clienti
 */


/**
 * @swagger
 * /customers:
 *   get:
 *     summary: Ottiene tutti i clienti
 *     tags: [Customers]
 *     responses:
 *       200:
 *         description: Lista di tutti i clienti
 *       500:
 *         description: Errore interno del server
 */
router.get("/", getAllCustomers);


/**
 * @swagger
 * /customers/{id}:
 *   get:
 *     summary: Ottiene un cliente per ID
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del cliente
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Dati del cliente richiesto
 *       404:
 *         description: Cliente non trovato
 *       500:
 *         description: Errore interno del server
 */
router.get("/:id", getCustomerById);


/**
 * @swagger
 * /customers:
 *   post:
 *     summary: Crea un nuovo cliente
 *     tags: [Customers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - first_name
 *               - last_name
 *               - email
 *             properties:
 *               first_name:
 *                 type: string
 *                 description: Nome del cliente
 *               last_name:
 *                 type: string
 *                 description: Cognome del cliente
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email univoca del cliente
 *               age:
 *                 type: string
 *                 description: Fascia di età del cliente
 *               note:
 *                 type: string
 *                 description: Note aggiuntive
 *     responses:
 *       201:
 *         description: Cliente creato con successo
 *       400:
 *         description: Dati non validi
 *       500:
 *         description: Errore interno del server
 */
router.post("/", createCustomer);


/**
 * @swagger
 * /customers/{id}:
 *   put:
 *     summary: Aggiorna un cliente esistente
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del cliente da aggiornare
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
 *                 description: Nome aggiornato del cliente
 *               last_name:
 *                 type: string
 *                 description: Cognome aggiornato del cliente
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email aggiornata del cliente
 *               age:
 *                 type: string
 *                 description: Fascia di età aggiornata del cliente
 *               note:
 *                 type: string
 *                 description: Note aggiornate
 *     responses:
 *       200:
 *         description: Cliente aggiornato con successo
 *       400:
 *         description: Dati non validi
 *       404:
 *         description: Cliente non trovato
 *       500:
 *         description: Errore interno del server
 */
router.put("/:id", updateCustomer);


/**
 * @swagger
 * /customers/{id}:
 *   delete:
 *     summary: Elimina un cliente
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del cliente da eliminare
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Cliente eliminato con successo
 *       404:
 *         description: Cliente non trovato
 *       500:
 *         description: Errore interno del server
 */
router.delete("/:id", deleteCustomer);


export default router;