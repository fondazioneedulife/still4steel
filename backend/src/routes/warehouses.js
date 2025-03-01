import express from "express";
import pool from "../config/db.js";

const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: Companies
 *   description: API per la gestione delle aziende
 */

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
router.post("/", async (req, res) => {
  try {
    const { name, address, type, note, company_id } = req.body;

    const result = await pool.query(
      `INSERT INTO warehouses (name, address, type, note, company_id) 
       VALUES ($1, $2, $3, $4, $5) 
       RETURNING *`,
      [name, address, type, note, company_id]
    );

    res.status(201).json({ message: "Magazzino creato", warehouse: result.rows[0] });
  } catch (error) {
    console.error("Errore nella creazione del magazzino:", error);
    res.status(500).json({ error: "Errore nel server" });
  }
});

/**
 * @swagger
 * /warehouses:
 *   get:
 *     summary: Ottiene tutti i magazzini
 *     tags: [Warehouses]
 *     responses:
 *       200:
 *         description: Lista dei magazzini
 */
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM warehouses");
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Errore nel recupero dei magazzini:", error);
    res.status(500).json({ error: "Errore nel server" });
  }
});

/**
 * @swagger
 * /warehouses/{id}:
 *   get:
 *     summary: Ottiene un magazzino tramite ID
 *     tags: [Warehouses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Dati del magazzino richiesto
 */
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM warehouses WHERE warehouse_id = $1", [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Magazzino non trovato" });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Errore nel recupero del magazzino:", error);
    res.status(500).json({ error: "Errore nel server" });
  }
});

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
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, address, type, note, company_id } = req.body;

    const result = await pool.query(
      `UPDATE warehouses 
       SET name = $1, address = $2, type = $3, note = $4, company_id = $5
       WHERE warehouse_id = $6 
       RETURNING *`,
      [name, address, type, note, company_id, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Magazzino non trovato" });
    }

    res.status(200).json({ message: "Magazzino aggiornato", warehouse: result.rows[0] });
  } catch (error) {
    console.error("Errore nell'aggiornamento del magazzino:", error);
    res.status(500).json({ error: "Errore nel server" });
  }
});

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
 *         description: Magazzino eliminato con successo
 */
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("DELETE FROM warehouses WHERE warehouse_id = $1 RETURNING *", [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Magazzino non trovato" });
    }

    res.status(200).json({ message: "Magazzino eliminato con successo" });
  } catch (error) {
    console.error("Errore nell'eliminazione del magazzino:", error);
    res.status(500).json({ error: "Errore nel server" });
  }
});

export default router;
