import express from "express";
import { 
    getAllWarehouses, 
    getWarehouseById, 
    createWarehouse, 
    updateWarehouse, 
    deleteWarehouse 
} from "../controllers/warehouseController.js";
import { 
    authenticateUser, 
    validateCompanyData 
} from "../middlewares/middleware.js";


const router = express.Router();


/**
 * @swagger
 * tags:
 *   name: Warehouses
 *   description: API per la gestione dei magazzini
 */


/**
 * @swagger
 * /warehouses:
 *   get:
 *     summary: Ottiene tutti i magazzini
 *     tags: [Warehouses]
 *     responses:
 *       200:
 *         description: Lista di tutti i magazzini
 *       500:
 *         description: Errore interno del server
 */
router.get("/", getAllWarehouses);


/**
 * @swagger
 * /warehouses/{id}:
 *   get:
 *     summary: Ottiene un magazzino per ID
 *     tags: [Warehouses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del magazzino
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Dettagli del magazzino richiesto
 *       404:
 *         description: Magazzino non trovato
 *       500:
 *         description: Errore interno del server
 */
router.get("/:id", getWarehouseById);


/**
 * @swagger
 * /warehouses:
 *   post:
 *     summary: Crea un nuovo magazzino
 *     tags: [Warehouses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - address
 *               - type
 *               - company_id
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nome del magazzino
 *               address:
 *                 type: string
 *                 description: Indirizzo del magazzino
 *               type:
 *                 type: string
 *                 description: Tipo del magazzino (es. deposito, negozio, ecc.)
 *               note:
 *                 type: string
 *                 description: Note aggiuntive sul magazzino
 *               company_id:
 *                 type: integer
 *                 description: ID dell'azienda proprietaria del magazzino
 *     responses:
 *       201:
 *         description: Magazzino creato con successo
 *       400:
 *         description: Dati non validi
 *       500:
 *         description: Errore interno del server
 */
router.post("/", createWarehouse);


/**
 * @swagger
 * /warehouses/{id}:
 *   put:
 *     summary: Aggiorna un magazzino esistente
 *     tags: [Warehouses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del magazzino da aggiornare
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nome aggiornato del magazzino
 *               address:
 *                 type: string
 *                 description: Indirizzo aggiornato del magazzino
 *               type:
 *                 type: string
 *                 description: Tipo aggiornato del magazzino
 *               note:
 *                 type: string
 *                 description: Note aggiornate sul magazzino
 *               company_id:
 *                 type: integer
 *                 description: ID aggiornato dell'azienda proprietaria
 *     responses:
 *       200:
 *         description: Magazzino aggiornato con successo
 *       400:
 *         description: Dati non validi
 *       404:
 *         description: Magazzino non trovato
 *       500:
 *         description: Errore interno del server
 */
router.put("/:id", updateWarehouse);


/**
 * @swagger
 * /warehouses/{id}:
 *   delete:
 *     summary: Elimina un magazzino
 *     tags: [Warehouses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del magazzino da eliminare
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Magazzino eliminato
 *       404:
 *         description: Magazzino non trovato
 *       500:
 *         description: Errore interno del server
 */
router.delete("/:id", deleteWarehouse);


export default router;