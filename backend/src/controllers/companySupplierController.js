import pool from "../config/db.js";

// Ottieni tutte le relazioni azienda-fornitore

export const getAllCompanySuppliers = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM company_supplier;");
        res.json(result.rows);
    } catch (error) {
        console.error("Errore nel recupero delle relezioni azienda-fornitore:", error);
        res.status(500).json({ error: "Errore del server" });
    }
};

// Ottieni una singola relazione per ID

export const getCompanySupplierById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query(
            "SELECT * FROM company_supplier WHERE company_supplier_id = $1;",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Relazione non trovata" });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error("Errore nel recupero dell'relazione azienda-fornitore:", error);
        res.status(500).json({ error: "Errore del server" });
    }
};

// Crea una nuova relazione
export const createCompanySupplier = async (req, res) => {
    const { company_id, supplier_id } = req.body;

    try {
        const result = await pool.query(
            `INSERT INTO company_supplier (company_id, supplier_id)
            VALUES ($1, $2) RETURNING *;`,
            [company_id, supplier_id]
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error("Errore nella creazione della relazione azienda-fornitore:", error);
        res.status(500).json({ error: "Errore del server" });
    }
};


// Modifica una relazione esistente
export const updateCompanySupplier = async (req, res) => {
    const { id } = req.params;
    const { company_id, supplier_id } = req.body;

    try {
        const result = await pool.query(
            `UPDATE company_supplier 
            SET company_id = $1, supplier_id = $2
            WHERE company_supplier_id = $3 RETURNING *;`,
            [company_id, supplier_id, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Relazione non trovata" });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error("Errore nella modifica della relazione azienda-fornitore:", error);
        res.status(500).json({ error: "Errore del server" });
    }
};

// Elimina una relazione
export const deleteCompanySupplier = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query(
            "DELETE FROM company_supplier WHERE company_supplier_id = $1 RETURNING *;",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Relazione non trovata" });
        }

        res.json({ message: "Relazione eliminata con successo" });
    } catch (error) {
        console.error("Errore nell'eliminazione della relazione azienda-fornitore:", error);
        res.status(500).json({ error: "Errore del server" });
    }
};