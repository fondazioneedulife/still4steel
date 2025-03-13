import pool from "../config/db.js";

// **1. Ottieni tutte le fatture**
export const getAllInvoices = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM invoices;");
        res.json(result.rows);
    } catch (error) {
        console.error("Errore nel recupero delle fatture:", error);
        res.status(500).json({ error: "Errore del server" });
    }
};

// **2. Ottieni una singola fattura per ID**
export const getInvoiceById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query(
            "SELECT * FROM invoices WHERE invoice_id = $1;",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Fattura non trovata" });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error("Errore nel recupero della fattura:", error);
        res.status(500).json({ error: "Errore del server" });
    }
};

// **3. Crea una nuova fattura**
export const createInvoice = async (req, res) => {
    const { type, description, state, note } = req.body;

    try {
        const result = await pool.query(
            `INSERT INTO invoices (type, description, state, note)
            VALUES ($1, $2, $3, $4) RETURNING *;`,
            [type, description, state, note]
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error("Errore nella creazione della fattura:", error);
        res.status(500).json({ error: "Errore del server" });
    }
};

// **4. Modifica una fattura esistente**
export const updateInvoice = async (req, res) => {
    const { id } = req.params;
    const { type, description, state, note } = req.body;

    try {
        const result = await pool.query(
            `UPDATE invoices 
            SET type = $1, description = $2, state = $3, note = $4
            WHERE invoice_id = $5 RETURNING *;`,
            [type, description, state, note, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Fattura non trovata" });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error("Errore nella modifica della fattura:", error);
        res.status(500).json({ error: "Errore del server" });
    }
};

// **5. Elimina una fattura**
export const deleteInvoice = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query(
            "DELETE FROM invoices WHERE invoice_id = $1 RETURNING *;",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Fattura non trovata" });
        }

        res.json({ message: "Fattura eliminata con successo" });
    } catch (error) {
        console.error("Errore nell'eliminazione della fattura:", error);
        res.status(500).json({ error: "Errore del server" });
    }
};
