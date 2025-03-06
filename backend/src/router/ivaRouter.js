// routes/ivaRouter.js
import express from "express";
import {
  createIva, getIvas, getIvaById, updateIva, deleteIva
} from "../controllers/ivaController.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: IVA
 *   description: API per la gestione delle aliquote IVA
 */

/**
 * @swagger
 * /iva:
 *   get:
 *     summary: Ottiene tutte le aliquote IVA
 *     tags: [IVA]
 *     responses:
 *       200:
 *         description: Lista delle aliquote IVA
 */
router.get("/", getIvas);

/**
 * @swagger
 * /iva/{id}:
 *   get:
 *     summary: Ottiene un'aliquota IVA per ID
 *     tags: [IVA]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Dettagli dell'aliquota IVA
 */
router.get("/:id", getIvaById);

/**
 * @swagger
 * /iva:
 *   post:
 *     summary: Crea una nuova aliquota IVA
 *     tags: [IVA]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [rate]
 *             properties:
 *               rate:
 *                 type: number
 *                 format: float
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Aliquota IVA creata con successo
 */
router.post("/", createIva);

/**
 * @swagger
 * /iva/{id}:
 *   put:
 *     summary: Aggiorna un'aliquota IVA esistente
 *     tags: [IVA]
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
 *               rate:
 *                 type: number
 *                 format: float
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Aliquota IVA aggiornata con successo
 */
router.put("/:id", updateIva);

/**
 * @swagger
 * /iva/{id}:
 *   delete:
 *     summary: Elimina un'aliquota IVA
 *     tags: [IVA]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Aliquota IVA eliminata con successo
 */
router.delete("/:id", deleteIva);

export default router;
