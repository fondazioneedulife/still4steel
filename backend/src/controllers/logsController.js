import pool from "../config/db.js";

// **1. Ottieni tutti i log**
export const getAllLogs = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM logs ORDER BY created_at DESC;");
        res.json(result.rows);
    } catch (error) {
        console.error("Errore nel recupero dei log:", error);
        res.status(500).json({ error: "Errore del server" });
    }
};

// **2. Ottieni un log per ID**
export const getLogById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query(
            "SELECT * FROM logs WHERE log_id = $1;",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Log non trovato" });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error("Errore nel recupero del log:", error);
        res.status(500).json({ error: "Errore del server" });
    }
};

// **3. Crea un nuovo log**
export const createLog = async (req, res) => {
    const { action, description, company_id } = req.body;

    try {
        const result = await pool.query(
            `INSERT INTO logs (action, description, company_id)
            VALUES ($1, $2, $3) RETURNING *;`,
            [action, description, company_id]
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error("Errore nella creazione del log:", error);
        res.status(500).json({ error: "Errore del server" });
    }
};

// **4. Elimina un log**
export const deleteLog = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query(
            "DELETE FROM logs WHERE log_id = $1 RETURNING *;",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Log non trovato" });
        }

        res.json({ message: "Log eliminato con successo" });
    } catch (error) {
        console.error("Errore nell'eliminazione del log:", error);
        res.status(500).json({ error: "Errore del server" });
    }
};
