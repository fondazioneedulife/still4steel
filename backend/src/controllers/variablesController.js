import pool from "../config/db.js";

export const getAllVariables = async (req, res) => {
    console.log("✅ GET /variables chiamata"); // DEBUG
    try {
        const result = await pool.query("SELECT * FROM variables");
        res.status(200).json(result.rows);
    } catch (error) {
        console.error("Errore nel recupero delle variabili:", error);
        res.status(500).json({ error: "Errore interno del server" });
    }
};

export const getVariableById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query("SELECT * FROM variables WHERE variable_id = $1", [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Variabile non trovata" });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error("Errore nel recupero della variabile:", error);
        res.status(500).json({ error: "Errore interno del server" });
    }
};

export const createVariable = async (req, res) => {
    try {
        const { type, name, product_id} = req.body;

        const result = await pool.query(
            `INSERT INTO variables
            (type, name, product_id)
            VALUES ($1, $2, $3) RETURNING *`,
            [type, name, product_id]
        );

        res.status(201).json({ message: "Variabile creata", product: result.rows[0] });
    } catch (error) {
        console.error("Errore nella creazione della variabile:", error);
        res.status(500).json({ error: "Errore nel server" });
    }
};

export const updateVariable = async (req, res) => {
    try {
        const { id } = req.params;
        const { type, product_id } = req.body;

        const result = await pool.query(
            `UPDATE variables
            SET type = $1, name = $2, product_id = $3
            WHERE variable_id = $4
            RETURNING *`,
            [type, product_id, id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Variabile non trovata" });
        }

        res.json({ message: "Variabile aggiornata", product: result.rows[0] });
    } catch (error) {
        console.error("Errore nell'aggiornamento della variabile:", error);
        res.status(500).json({ error: "Errore nel server" });
    }
};

export const deleteVariable = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query("DELETE FROM variables WHERE variable_id = $1", [id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Variabile non trovato" });
        }

        res.json({ message: "Variabile eliminata con successo" });
    } catch (error) {
        console.error("Errore nell'eliminazione della variabile:", error);
        res.status(500).json({ error: "Errore nel server" });
    }
};