import pool from "../config/db.js";


export const getAllDiscounts = async (req, res) => {
    console.log("✅ GET /discounts chiamata"); // DEBUG
    try {
        const result = await pool.query("SELECT * FROM discounts");
        res.status(200).json(result.rows);
    } catch (error) {
        console.error("Errore nel recupero degli sconti:", error);
        res.status(500).json({ error: "Errore interno del server" });
    }
};

export const getDiscountById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query("SELECT * FROM discounts WHERE discount_id = $1", [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Sconto non trovato" });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error("Errore nel recupero dello sconto:", error);
        res.status(500).json({ error: "Errore interno del server" });
    }
};

export const createDiscount = async (req, res) => {
    try {
        const { type, value, date_start, date_end, state, description, note } = req.body;

        if (!type || !value || !date_start || !date_end || !state) {
            return res.status(400).json({ error: "I campi obbligatori devono essere compilati" });
        }

        const result = await pool.query(
            `INSERT INTO discounts (type, value, date_start, date_end, state, description, note) 
            VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
            [type, value, date_start, date_end, state, description, note]
        );

        res.status(201).json({ message: "Sconto creato", discount: result.rows[0] });
    } catch (error) {
        console.error("Errore nella creazione dello sconto:", error);
        res.status(500).json({ error: "Errore nel server" });
    }
};

export const updateDiscount = async (req, res) => {
    try {
        const { id } = req.params;
        const { type, value, date_start, date_end, state, description, note } = req.body;

        const result = await pool.query(
            `UPDATE discounts SET type = $1, value = $2, date_start = $3, date_end = $4, 
            state = $5, description = $6, note = $7 WHERE discount_id = $8 RETURNING *`,
            [type, value, date_start, date_end, state, description, note, id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Sconto non trovato" });
        }

        res.json({ message: "Sconto aggiornato", discount: result.rows[0] });
    } catch (error) {
        console.error("Errore nell'aggiornamento dello sconto:", error);
        res.status(500).json({ error: "Errore nel server" });
    }
};

export const deleteDiscount = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query("DELETE FROM discounts WHERE discount_id = $1", [id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Sconto non trovato" });
        }

        res.json({ message: "Sconto eliminato con successo" });
    } catch (error) {
        console.error("Errore nell'eliminazione dello sconto:", error);
        res.status(500).json({ error: "Errore nel server" });
    }
};