import express from "express";
import pool from "../config/db.js"; // Importa la connessione al database

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
/*
router.get("/", (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM companies");
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Errore nel recupero delle aziende:", error);
    res.status(500).json({ error: "Errore interno del server" });
  }
});

router.get("/", (req, res) => {
  pool.query("SELECT * FROM companies")
    .then(result => res.status(200).json(result.rows))
    .catch(error => {
      console.error("Errore nel recupero delle aziende:", error);
      res.status(500).json({ error: "Errore interno del server" });
    });
});
*/
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
router.get("/:id", (req, res) => {
  const { id } = req.params;
  pool.query("SELECT * FROM companies WHERE company_id = $1", [id])
    .then(result => res.status(200).json(result.rows))
    .catch(error => {
      console.error("Errore nel recupero delle aziende:", error);
      res.status(500).json({ error: "Errore interno del server" });
    });
});

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
// Creazione di un'azienda
router.post("/", async (req, res) => {
  try {
    const { 
      name, vat, tax_code, phone, email, address, 
      password, password_confirm, note 
    } = req.body;

    if (password !== password_confirm) {
      return res.status(400).json({ error: "Le password non corrispondono" });
    }

    const result = await pool.query(
      `INSERT INTO companies 
        (name, vat, tax_code, phone, email, address, password, password_confirm, note) 
      VALUES 
        ($1, $2, $3, $4, $5, $6, $7, $8, $9) 
      RETURNING *`,
      [name, vat, tax_code, phone, email, address, password, password_confirm, note]
    );

    res.status(201).json({ message: "Azienda creata", company: result.rows[0] });
  } catch (error) {
    console.error("Errore nella creazione dell'azienda:", error);
    res.status(500).json({ error: "Errore nel server" });
  }
});

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
// Aggiornamento di un'azienda
router.put("/:id", async (req, res) => {
  try {
    const { company_id } = req.params;
    const { name } = req.body;
    const result = await pool.query(
      "UPDATE companies SET name = $1 WHERE company_id = $2 RETURNING *",
      [name, company_id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Azienda non trovata" });
    }

    res.json({ message: "Azienda aggiornata", company: result.rows[0] });
  } catch (error) {
    console.error("Errore nell'aggiornamento:", error);
    res.status(500).json({ error: "Errore nel server" });
  }
});

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
router.delete("/:id", async (req, res) => {
  try {
    const { company_id } = req.params;
    const result = await pool.query("DELETE FROM companies WHERE company_id = $1", [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Azienda non trovata" });
    }

    res.json({ message: "Azienda eliminata" });
  } catch (error) {
    console.error("Errore nell'eliminazione:", error);
    res.status(500).json({ error: "Errore nel server" });
  }
});

export default router;