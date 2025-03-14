import pool from "../config/db.js";

// Ottieni tutte le relazioni prodotto-fornitura
export const getAllSupplyProducts = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM supply_product;");
        res.json(result.rows);
    } catch (error) {
        console.error("Errore nel recupero delle relazioni prodotto-fornitura:", error);
        res.status(500).json({ error: "Errore del server" });
    }
};

// Ottieni una singola relazione per ID
export const getSupplyProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query(
            "SELECT * FROM supply_product WHERE supply_product_id = $1;",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Relazione non trovata" });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error("Errore nel recupero della relazione prodotto-fornitura:", error);
        res.status(500).json({ error: "Errore del server" });
    }
};

// Crea una nuova relazione
export const createSupplyProduct = async (req, res) => {
    const { product_id, supply_id } = req.body;

    try {
        const result = await pool.query(
            `INSERT INTO supply_product (product_id, supply_id)
            VALUES ($1, $2) RETURNING *;`,
            [product_id, supply_id]
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error("Errore nella creazione della relazione prodotto-fornitura:", error);
        res.status(500).json({ error: "Errore del server" });
    }
};

// Modifica una relazione esistente
export const updateSupplyProduct = async (req, res) => {
    const { id } = req.params;
    const { product_id, supply_id } = req.body;

    try {
        const result = await pool.query(
            `UPDATE supply_product 
            SET product_id = $1, supply_id = $2
            WHERE supply_product_id = $3 RETURNING *;`,
            [product_id, supply_id, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Relazione non trovata" });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error("Errore nella modifica della relazione prodotto-fornitura:", error);
        res.status(500).json({ error: "Errore del server" });
    }
};

// Elimina una relazione
export const deleteSupplyProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query(
            "DELETE FROM supply_product WHERE supply_product_id = $1 RETURNING *;",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Relazione non trovata" });
        }

        res.json({ message: "Relazione eliminata con successo" });
    } catch (error) {
        console.error("Errore nell'eliminazione della relazione prodotto-fornitura:", error);
        res.status(500).json({ error: "Errore del server" });
    }
};