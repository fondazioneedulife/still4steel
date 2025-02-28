const express = require("express");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Warehouse
 *   description: API per la gestione del magazzino
 */

/**
 * @swagger
 * /warehouse:
 *   get:
 *     summary: Ottieni tutti gli articoli in magazzino
 *     tags: [Warehouse]
 *     responses:
 *       200:
 *         description: Lista articoli in magazzino
 */
router.get("/", (req, res) => {
  res.status(200).json([{ id: 1, name: "Prodotto XYZ", quantity: 10 }]);
});

/**
 * @swagger
 * /warehouse:
 *   post:
 *     summary: Aggiungi un nuovo articolo al magazzino
 *     tags: [Warehouse]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Prodotto ABC"
 *               quantity:
 *                 type: integer
 *                 example: 20
 *     responses:
 *       201:
 *         description: Articolo aggiunto con successo
 */
router.post("/", (req, res) => {
  res.status(201).json({ message: "Articolo aggiunto" });
});

module.exports = router;
