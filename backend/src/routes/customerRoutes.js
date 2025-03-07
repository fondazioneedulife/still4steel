import express from "express";
import { getCustomers, getCustomerById, createCustomer, updateCustomer, deleteCustomer } from "../controllers/customerController.js";

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
router.get("/", getCustomers);


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
 *             properties:
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               email:
 *                 type: string
 *               age:
 *                 type: string
 *               note:
 *                 type: string
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
 *     summary: Aggiorna un cliente
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
 *               last_name:
 *                 type: string
 *               email:
 *                 type: string
 *               age:
 *                 type: string
 *               note:
 *                 type: string
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