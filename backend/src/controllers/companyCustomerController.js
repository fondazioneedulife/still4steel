import pool from "../config/db.js";

export const getAllCompanyCustomers = async (req, res) => {

    console.log("✅ GET /company-customers chiamata"); // DEBUG
    try {
        const result = await pool.query("SELECT * FROM company_customer");
        res.status(200).json(result.rows);
    } catch (error) {
        console.error("Errore nel recupero delle relazioni azienda-cliente:", error);
        res.status(500).json({ error: "Errore interno del server" });
    }
};

export const getCompanyCustomerById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query("SELECT * FROM company_customer WHERE company_customer_id = $1", [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Relazione non trovata" });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error("Errore nel recupero della relazione:", error);
        res.status(500).json({ error: "Errore interno del server" });
    }
};

export const createCompanyCustomer = async (req, res) => {
    try {
        const { company_id, customer_id } = req.body;

        if (!company_id || !customer_id) {
            return res.status(400).json({ error: "I campi company_id e customer_id sono obbligatori" });
        }

        const result = await pool.query(
            `INSERT INTO company_customer (company_id, customer_id) 
             VALUES ($1, $2) RETURNING *`,
            [company_id, customer_id]
        );

        res.status(201).json({ message: "Relazione creata", companyCustomer: result.rows[0] });
    } catch (error) {
        console.error("Errore nella creazione della relazione:", error);
        res.status(500).json({ error: "Errore nel server" });
    }
};

export const updateCompanyCustomer = async (req, res) => {
    const { id } = req.params;
    const { company_id, customer_id } = req.body;

    try {
        const result = await pool.query(
            `UPDATE company_customer
            SET company_id = $1, customer_id = $2
            WHERE company_customer_id = $3 RETURNING *;`,
            [company_id, customer_id, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Relazione non trovata" });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error("Errore nella modifica della relazione azienda-cliente:", error);
        res.status(500).json({ error: "Errore del server" });
    }
};

export const deleteCompanyCustomer = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query("DELETE FROM company_customer WHERE company_customer_id = $1", [id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Relazione non trovata" });
        }

        res.json({ message: "Relazione eliminata con successo" });
    } catch (error) {
        console.error("Errore nell'eliminazione della relazione:", error);
        res.status(500).json({ error: "Errore nel server" });
    }
};