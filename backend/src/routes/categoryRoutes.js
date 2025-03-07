import express from "express";
import {
    getCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
} from "../controllers/categoryController.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: API per la gestione delle categorie di prodotti
 */

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Ottiene tutte le categorie
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: Lista di tutte le categorie
 *       500:
 *         description: Errore interno del server
 */
router.get("/", getCategories);

/**
 * @swagger
 * /categories/{id}:
 *   get:
 *     summary: Ottiene una categoria per ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID della categoria
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Dettagli della categoria richiesta
 *       404:
 *         description: Categoria non trovata
 *       500:
 *         description: Errore interno del server
 */
router.get("/:id", getCategoryById);

/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Crea una nuova categoria
 *     tags: [Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Categoria creata con successo
 *       400:
 *         description: Dati non validi
 *       500:
 *         description: Errore interno del server
 */
router.post("/", createCategory);

/**
 * @swagger
 * /categories/{id}:
 *   put:
 *     summary: Aggiorna una categoria esistente
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID della categoria da aggiornare
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
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Categoria aggiornata con successo
 *       400:
 *         description: Dati non validi
 *       404:
 *         description: Categoria non trovata
 *       500:
 *         description: Errore interno del server
 */
router.put("/:id", updateCategory);

/**
 * @swagger
 * /categories/{id}:
 *   delete:
 *     summary: Elimina una categoria
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID della categoria da eliminare
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Categoria eliminata con successo
 *       404:
 *         description: Categoria non trovata
 *       500:
 *         description: Errore interno del server
 */
router.delete("/:id", deleteCategory);

export default router;
