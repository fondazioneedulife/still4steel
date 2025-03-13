import pool from "../config/db.js";

export const getProductCategories = async (req, res) => {
    console.log("✅ GET /product-category chiamata"); // DEBUG
    try {
        const result = await pool.query("SELECT * FROM product_category");
        res.status(200).json(result.rows);
    } catch (error) {
        console.error("Errore nel recupero delle associazioni:", error);
        res.status(500).json({ error: "Errore interno del server" });
    }
};

export const getProductCategoryById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query("SELECT * FROM product_category WHERE product_category_id = $1", [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Associazione non trovata" });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error("Errore nel recupero dell'associazione:", error);
        res.status(500).json({ error: "Errore interno del server" });
    }
};

export const createProductCategory = async (req, res) => {
    try {
        const { product_id, category_id } = req.body;

        if (!product_id || !category_id) {
            return res.status(400).json({ error: "product_id e category_id sono obbligatori" });
        }

        const result = await pool.query(
            "INSERT INTO product_category (product_id, category_id) VALUES ($1, $2) RETURNING *",
            [product_id, category_id]
        );

        res.status(201).json({ message: "Associazione creata", productCategory: result.rows[0] });
    } catch (error) {
        console.error("Errore nella creazione dell'associazione:", error);
        res.status(500).json({ error: "Errore nel server" });
    }
};

export const updateProductCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { product_id, category_id } = req.body;

        if (!product_id || !category_id) {
            return res.status(400).json({ error: "product_id e category_id sono obbligatori" });
        }

        const result = await pool.query(
            "UPDATE product_category SET product_id = $1, category_id = $2 WHERE product_category_id = $3 RETURNING *",
            [product_id, category_id, id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Associazione non trovata" });
        }

        res.json({ message: "Associazione aggiornata", productCategory: result.rows[0] });
    } catch (error) {
        console.error("Errore nell'aggiornamento dell'associazione:", error);
        res.status(500).json({ error: "Errore nel server" });
    }
};

export const deleteProductCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query("DELETE FROM product_category WHERE product_category_id = $1", [id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Associazione non trovata" });
        }

        res.json({ message: "Associazione eliminata con successo" });
    } catch (error) {
        console.error("Errore nell'eliminazione dell'associazione:", error);
        res.status(500).json({ error: "Errore nel server" });
    }
};
