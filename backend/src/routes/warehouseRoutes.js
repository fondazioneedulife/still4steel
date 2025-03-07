import express from "express";
import { createWarehouse, getWarehouses, getWarehouseById, updateWarehouse, deleteWarehouse } from "../controllers/warehouseController.js";
import { authenticateUser, validateCompanyData } from "../middlewares/middleware.js";

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
 *         description: Lista di magazzini
 */
router.get("/", getWarehouses);

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
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Dettagli del magazzino
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
 *             required: [name, address, type, company_id]
 *             properties:
 *               name:
 *                 type: string
 *               address:
 *                 type: string
 *               type:
 *                 type: string
 *               note:
 *                 type: string
 *               company_id:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Magazzino creato con successo
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
 *               address:
 *                 type: string
 *               type:
 *                 type: string
 *               note:
 *                 type: string
 *               company_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Magazzino aggiornato con successo
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
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Magazzino eliminato
 */
router.delete("/:id", deleteWarehouse);

export default router;