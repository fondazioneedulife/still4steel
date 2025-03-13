import pool from "../config/db.js";

export const getProductDiscounts = async (req, res) => {
    console.log("✅ GET /product-discounts chiamata"); // DEBUG
    try {
        const result = await pool.query("SELECT * FROM product_discount");
        res.status(200).json(result.rows);
    } catch (error) {
        console.error("Errore nel recupero delle associazioni:", error);
        res.status(500).json({ error: "Errore interno del server" });
    }
};

export const getProductDiscountById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query("SELECT * FROM product_discount WHERE product_discount_id = $1", [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Associazione non trovata" });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error("Errore nel recupero dell'associazione:", error);
        res.status(500).json({ error: "Errore interno del server" });
    }
};

export const createProductDiscount = async (req, res) => {
    try {
        const { product_id, discount_id } = req.body;

        if (!product_id || !discount_id) {
            return res.status(400).json({ error: "I campi product_id e discount_id sono obbligatori" });
        }

        const result = await pool.query(
            `INSERT INTO product_discount (product_id, discount_id) 
             VALUES ($1, $2) RETURNING *`,
            [product_id, discount_id]
        );

        res.status(201).json({ message: "Associazione creata", productDiscount: result.rows[0] });
    } catch (error) {
        console.error("Errore nella creazione dell'associazione:", error);
        res.status(500).json({ error: "Errore nel server" });
    }
};

export const updateProductDiscount = async (req, res) => {
    try {
        const { id } = req.params;
        const { product_id, discount_id } = req.body;

        const result = await pool.query(
            `UPDATE product_discount SET product_id = $1, discount_id = $2 
             WHERE product_discount_id = $3 RETURNING *`,
            [product_id, discount_id, id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Associazione non trovata" });
        }

        res.json({ message: "Associazione aggiornata", productDiscount: result.rows[0] });
    } catch (error) {
        console.error("Errore nell'aggiornamento dell'associazione:", error);
        res.status(500).json({ error: "Errore nel server" });
    }
};

export const deleteProductDiscount = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query("DELETE FROM product_discount WHERE product_discount_id = $1", [id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Associazione non trovata" });
        }

        res.json({ message: "Associazione eliminata con successo" });
    } catch (error) {
        console.error("Errore nell'eliminazione dell'associazione:", error);
        res.status(500).json({ error: "Errore nel server" });
    }
};
