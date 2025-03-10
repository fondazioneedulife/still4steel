import pool from "../config/db.js";

// **1. Ottieni tutte le associazioni prodotto-fornitura**
export const getAllSupplyProducts = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM supply_product;");
        res.json(result.rows);
    } catch (error) {
        console.error("Errore nel recupero delle associazioni prodotto-fornitura:", error);
        res.status(500).json({ error: "Errore del server" });
    }
};

// **2. Ottieni una singola associazione per ID**
export const getSupplyProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query(
            "SELECT * FROM supply_product WHERE supply_product_id = $1;",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Associazione non trovata" });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error("Errore nel recupero dell'associazione prodotto-fornitura:", error);
        res.status(500).json({ error: "Errore del server" });
    }
};

// **3. Crea una nuova associazione**
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
        console.error("Errore nella creazione dell'associazione prodotto-fornitura:", error);
        res.status(500).json({ error: "Errore del server" });
    }
};

// **4. Modifica un'associazione esistente**
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
            return res.status(404).json({ error: "Associazione non trovata" });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error("Errore nella modifica dell'associazione prodotto-fornitura:", error);
        res.status(500).json({ error: "Errore del server" });
    }
};

// **5. Elimina un'associazione**
export const deleteSupplyProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query(
            "DELETE FROM supply_product WHERE supply_product_id = $1 RETURNING *;",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Associazione non trovata" });
        }

        res.json({ message: "Associazione eliminata con successo" });
    } catch (error) {
        console.error("Errore nell'eliminazione dell'associazione prodotto-fornitura:", error);
        res.status(500).json({ error: "Errore del server" });
    }
};