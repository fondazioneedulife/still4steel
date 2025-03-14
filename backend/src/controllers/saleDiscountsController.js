import pool from "../config/db.js";

// Ottieni tutte le relazioni sale-discount
export const getAllSaleDiscounts = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM sale_discount;");
        res.json(result.rows);
    } catch (error) {
        console.error("Errore nel recupero delle relazioni sale-discount:", error);
        res.status(500).json({ error: "Errore del server" });
    }
};

// Ottieni una relazione sale-discount per ID
export const getSaleDiscountById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query(
            "SELECT * FROM sale_discount WHERE sale_discount_id = $1;",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Relazione non trovata" });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error("Errore nel recupero della relazione sale-discount:", error);
        res.status(500).json({ error: "Errore del server" });
    }
};

// Crea una nuova relazione sale-discount
export const createSaleDiscount = async (req, res) => {
    const { sale_id, discount_id } = req.body;

    try {
        const result = await pool.query(
            `INSERT INTO sale_discount (sale_id, discount_id)
            VALUES ($1, $2) RETURNING *;`,
            [sale_id, discount_id]
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error("Errore nella creazione della relazione sale-discount:", error);
        res.status(500).json({ error: "Errore del server" });
    }
};

// Modifica una relazione esistente
export const updateSaleDiscount = async (req, res) => {
    const { id } = req.params;
    const { sale_id, discount_id } = req.body;

    try {
        const result = await pool.query(
            `UPDATE sale_discount 
            SET sale_id = $1, discount_id = $2
            WHERE sale_discount_id = $3 RETURNING *;`,
            [sale_id, discount_id, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Relazione non trovata" });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error("Errore nella modifica della relazione sale-discount:", error);
        res.status(500).json({ error: "Errore del server" });
    }
};

// Elimina una relazione sale-discount
export const deleteSaleDiscount = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query(
            "DELETE FROM sale_discount WHERE sale_discount_id = $1 RETURNING *;",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Relazione non trovata" });
        }

        res.json({ message: "Relazione eliminata con successo" });
    } catch (error) {
        console.error("Errore nell'eliminazione della relazione sale-discount:", error);
        res.status(500).json({ error: "Errore del server" });
    }
};