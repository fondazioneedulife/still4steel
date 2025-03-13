import pool from "../config/db.js";

export const getAllCustomers = async (req, res) => {
    console.log("✅ GET /customers chiamata"); // DEBUG
    try {
        const result = await pool.query("SELECT * FROM customers");
        res.status(200).json(result.rows);
    } catch (error) {
        console.error("Errore nel recupero dei clienti:", error);
        res.status(500).json({ error: "Errore interno del server" });
    }
};

export const getCustomerById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query("SELECT * FROM customers WHERE customer_id = $1", [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Cliente non trovato" });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error("Errore nel recupero del cliente:", error);
        res.status(500).json({ error: "Errore interno del server" });
    }
};

export const createCustomer = async (req, res) => {
    try {
        const { first_name, last_name, email, age, note } = req.body;

        if (!first_name  !last_name  !email) {

            return res.status(400).json({ error: "I campi first_name, last_name ed email sono obbligatori" });
        }

        const result = await pool.query(
            `INSERT INTO customers (first_name, last_name, email, age, note) 
             VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [first_name, last_name, email, age, note]
        );

        res.status(201).json({ message: "Cliente creato", customer: result.rows[0] });
    } catch (error) {
        console.error("Errore nella creazione del cliente:", error);
        res.status(500).json({ error: "Errore nel server" });
    }
};

export const updateCustomer = async (req, res) => {
    try {
        const { id } = req.params;
        const { first_name, last_name, email, age, note } = req.body;

        const result = await pool.query(
            `UPDATE customers 
             SET first_name = $1, last_name = $2, email = $3, age = $4, note = $5
             WHERE customer_id = $6 RETURNING *`,
            [first_name, last_name, email, age, note, id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Cliente non trovato" });
        }

        res.json({ message: "Cliente aggiornato", customer: result.rows[0] });
    } catch (error) {
        console.error("Errore nell'aggiornamento del cliente:", error);
        res.status(500).json({ error: "Errore nel server" });
    }
};

export const deleteCustomer = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query("DELETE FROM customers WHERE customer_id = $1", [id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Cliente non trovato" });
        }

        res.json({ message: "Cliente eliminato con successo" });
    } catch (error) {
        console.error("Errore nell'eliminazione del cliente:", error);
        res.status(500).json({ error: "Errore nel server" });
    }
};