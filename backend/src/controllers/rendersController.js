import pool from "../config/db.js";

// Ottieni tutti i renders
export const getRenders = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM renders");
        res.status(200).json(result.rows);
    } catch (error) {
        console.error("Errore nel recupero dei renders:", error);
        res.status(500).json({ error: "Errore interno del server" });
    }
};

// Ottieni un render per ID
export const getRenderById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query("SELECT * FROM renders WHERE render_id = $1", [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Render non trovato" });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error("Errore nel recupero del render:", error);
        res.status(500).json({ error: "Errore interno del server" });
    }
};

// Crea un nuovo render
export const createRender = async (req, res) => {
    try {
        const { quantity, state, accept, description, note, order_detail_id } = req.body;
        const result = await pool.query(
            `INSERT INTO renders (quantity, state, accept, description, note, order_detail_id) 
            VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
            [quantity, state, accept, description, note, order_detail_id]
        );
        res.status(201).json({ message: "Render creato", render: result.rows[0] });
    } catch (error) {
        console.error("Errore nella creazione del render:", error);
        res.status(500).json({ error: "Errore nel server" });
    }
};

// Aggiorna un render
export const updateRender = async (req, res) => {
    try {
        const { id } = req.params;
        const { quantity, state, accept, description, note, order_detail_id } = req.body;
        const result = await pool.query(
            `UPDATE renders 
            SET quantity = $1, state = $2, accept = $3, description = $4, note = $5, order_detail_id = $6
            WHERE render_id = $7 RETURNING *`,
            [quantity, state, accept, description, note, order_detail_id, id]
        );
        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Render non trovato" });
        }
        res.json({ message: "Render aggiornato", render: result.rows[0] });
    } catch (error) {
        console.error("Errore nell'aggiornamento del render:", error);
        res.status(500).json({ error: "Errore nel server" });
    }
};

// Elimina un render
export const deleteRender = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query("DELETE FROM renders WHERE render_id = $1", [id]);
        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Render non trovato" });
        }
        res.json({ message: "Render eliminato con successo" });
    } catch (error) {
        console.error("Errore nell'eliminazione del render:", error);
        res.status(500).json({ error: "Errore nel server" });
    }
};