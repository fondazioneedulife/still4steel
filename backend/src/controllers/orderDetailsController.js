import pool from "../config/db.js";

// Ottieni tutti i dettagli degli ordini
export const getAllOrderDetails = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM order_details;");
        res.json(result.rows);
    } catch (error) {
        console.error("Errore nel recupero dei dettagli degli ordini:", error);
        res.status(500).json({ error: "Errore del server" });
    }
};

// Ottieni un dettaglio ordine per ID

export const getOrderDetailById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query(
            "SELECT * FROM order_details WHERE order_detail_id = $1;",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Dettaglio ordine non trovato" });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error("Errore nel recupero del dettaglio ordine:", error);
        res.status(500).json({ error: "Errore del server" });
    }
};

// Crea un nuovo dettaglio ordine

export const createOrderDetail = async (req, res) => {
    const { quantity, note, product_id, order_id } = req.body;

    try {
        const result = await pool.query(
            `INSERT INTO order_details (quantity, note, product_id, order_id)
            VALUES ($1, $2, $3, $4) RETURNING *;`,
            [quantity, note, product_id, order_id]
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error("Errore nella creazione del dettaglio ordine:", error);
        res.status(500).json({ error: "Errore del server" });
    }
};

// Modifica un dettaglio ordine esistente

export const updateOrderDetail = async (req, res) => {
    const { id } = req.params;
    const { quantity, note, product_id, order_id } = req.body;

    try {
        const result = await pool.query(
            `UPDATE order_details 
            SET quantity = $1, note = $2, product_id = $3, order_id = $4
            WHERE order_detail_id = $5 RETURNING *;`,
            [quantity, note, product_id, order_id, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Dettaglio ordine non trovato" });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error("Errore nella modifica del dettaglio ordine:", error);
        res.status(500).json({ error: "Errore del server" });
    }
};

// Elimina un dettaglio ordine

export const deleteOrderDetail = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query(
            "DELETE FROM order_details WHERE order_detail_id = $1 RETURNING *;",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Dettaglio ordine non trovato" });
        }

        res.json({ message: "Dettaglio ordine eliminato con successo" });
    } catch (error) {
        console.error("Errore nell'eliminazione del dettaglio ordine:", error);
        res.status(500).json({ error: "Errore del server" });
    }
};