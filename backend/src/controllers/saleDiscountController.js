import pool from "../config/db.js";

// **1. Ottieni tutte le associazioni sale-discount**
export const getAllSaleDiscounts = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM sale_discount;");
        res.json(result.rows);
    } catch (error) {
        console.error("Errore nel recupero delle associazioni sale-discount:", error);
        res.status(500).json({ error: "Errore del server" });
    }
};

// **2. Ottieni un'associazione sale-discount per ID**
export const getSaleDiscountById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query(
            "SELECT * FROM sale_discount WHERE sale_discount_id = $1;",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Associazione non trovata" });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error("Errore nel recupero dell'associazione sale-discount:", error);
        res.status(500).json({ error: "Errore del server" });
    }
};

// **3. Crea una nuova associazione sale-discount**
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
        console.error("Errore nella creazione dell'associazione sale-discount:", error);
        res.status(500).json({ error: "Errore del server" });
    }
};

// **4. Modifica un'associazione esistente**
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
            return res.status(404).json({ error: "Associazione non trovata" });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error("Errore nella modifica dell'associazione sale-discount:", error);
        res.status(500).json({ error: "Errore del server" });
    }
};

// **5. Elimina un'associazione sale-discount**
export const deleteSaleDiscount = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query(
            "DELETE FROM sale_discount WHERE sale_discount_id = $1 RETURNING *;",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Associazione non trovata" });
        }

        res.json({ message: "Associazione eliminata con successo" });
    } catch (error) {
        console.error("Errore nell'eliminazione dell'associazione sale-discount:", error);
        res.status(500).json({ error: "Errore del server" });
    }
};