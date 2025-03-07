import express from "express";
import { 
  createCompany, getCompanies, getCompanyById, 
  updateCompany, deleteCompany 
} from "../controllers/companyController.js";
import { authenticateUser } from "../middlewares/middleware.js";

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
 *     summary: Ottieni tutte le aziende
 *     tags: [Companies]
 *     responses:
 *       200:
 *         description: Lista di aziende
 */
router.get("/", getCompanies);
/**
 * @swagger
 * /companies/{id}:
 *   get:
 *     summary: Ottieni i dettagli di un'azienda
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
 *         description: Dati dell'azienda
 *       404:
 *         description: Azienda non trovata
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
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Azienda ABC"
 *     responses:
 *       201:
 *         description: Azienda creata con successo
 */
router.post("/", authenticateUser, createCompany);
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
 *                 example: "Nuovo Nome Azienda"
 *     responses:
 *       200:
 *         description: Azienda aggiornata
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
 */

// Eliminazione di un'azienda
router.delete("/:id", authenticateUser, deleteCompany);

export default router;