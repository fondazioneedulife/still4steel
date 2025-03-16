import express from "express";
import pool from "../config/db.js";

const router = express.Router();

// Recupera i widget dal database
router.get("/widgets", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM widgets");
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send("Errore del server");
    }
});

// Salva i widget nel database
router.post("/widgets", async (req, res) => {
    try {
        const { widget } = req.body;
        await pool.query("INSERT INTO widgets (name) VALUES ($1)", [widget.name]);
        res.status(201).send("Widget salvato");
    } catch (err) {
        console.error(err);
        res.status(500).send("Errore del server");
    }
});

export default router;