import pool from "../config/db.js";

// Ottieni tutti gli ordini
export const getAllOrders = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM orders");
        res.status(200).json(result.rows);
    } catch (error) {
        console.error("Errore nel recupero degli ordini:", error);
        res.status(500).json({ error: "Errore interno del server" });
    }
};

// Ottieni un ordine per ID
export const getOrderById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query("SELECT * FROM orders WHERE order_id = $1", [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Ordine non trovato" });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error("Errore nel recupero dell'ordine:", error);
        res.status(500).json({ error: "Errore interno del server" });
    }
};

// Crea un nuovo ordine
export const createOrder = async (req, res) => {
    try {
        const { state, note, customer_id, company_id, invoice_id } = req.body;
        const result = await pool.query(
            `INSERT INTO orders (state, note, customer_id, company_id, invoice_id) 
            VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [state, note, customer_id, company_id, invoice_id]
        );
        res.status(201).json({ message: "Ordine creato", order: result.rows[0] });
    } catch (error) {
        console.error("Errore nella creazione dell'ordine:", error);
        res.status(500).json({ error: "Errore nel server" });
    }
};

// Aggiorna un ordine
export const updateOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const { state, note, customer_id, company_id, invoice_id } = req.body;
        const result = await pool.query(
            `UPDATE orders 
            SET state = $1, note = $2, customer_id = $3, company_id = $4, invoice_id = $5 
            WHERE order_id = $6 RETURNING *`,
            [state, note, customer_id, company_id, invoice_id, id]
        );
        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Ordine non trovato" });
        }
        res.json({ message: "Ordine aggiornato", order: result.rows[0] });
    } catch (error) {
        console.error("Errore nell'aggiornamento dell'ordine:", error);
        res.status(500).json({ error: "Errore nel server" });
    }
};

// Elimina un ordine
export const deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query("DELETE FROM orders WHERE order_id = $1", [id]);
        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Ordine non trovato" });
        }
        res.json({ message: "Ordine eliminato con successo" });
    } catch (error) {
        console.error("Errore nell'eliminazione dell'ordine:", error);
        res.status(500).json({ error: "Errore nel server" });
    }
};
