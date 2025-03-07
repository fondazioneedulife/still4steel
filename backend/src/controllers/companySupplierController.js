import pool from "../config/db.js";

// **1. Ottieni tutte le associazioni azienda-fornitore**
export const getAllCompanySuppliers = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM company_supplier;");
        res.json(result.rows);
    } catch (error) {
        console.error("Errore nel recupero delle associazioni azienda-fornitore:", error);
        res.status(500).json({ error: "Errore del server" });
    }
};

// **2. Ottieni una singola associazione per ID**
export const getCompanySupplierById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query(
            "SELECT * FROM company_supplier WHERE company_supplier_id = $1;",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Associazione non trovata" });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error("Errore nel recupero dell'associazione azienda-fornitore:", error);
        res.status(500).json({ error: "Errore del server" });
    }
};

// **3. Crea una nuova associazione**
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
        console.error("Errore nella creazione dell'associazione azienda-fornitore:", error);
        res.status(500).json({ error: "Errore del server" });
    }
};

// **4. Modifica un'associazione esistente**
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
            return res.status(404).json({ error: "Associazione non trovata" });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error("Errore nella modifica dell'associazione azienda-fornitore:", error);
        res.status(500).json({ error: "Errore del server" });
    }
};

// **5. Elimina un'associazione**
export const deleteCompanySupplier = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query(
            "DELETE FROM company_supplier WHERE company_supplier_id = $1 RETURNING *;",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Associazione non trovata" });
        }

        res.json({ message: "Associazione eliminata con successo" });
    } catch (error) {
        console.error("Errore nell'eliminazione dell'associazione azienda-fornitore:", error);
        res.status(500).json({ error: "Errore del server" });
    }
};
