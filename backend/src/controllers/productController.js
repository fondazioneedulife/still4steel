import pool from "../config/db.js";

export const getProducts = async (req, res) => {
    console.log("✅ GET /products chiamata"); // DEBUG
    try {
        const result = await pool.query("SELECT * FROM products");
        res.status(200).json(result.rows);
    } catch (error) {
        console.error("Errore nel recupero dei prodotti:", error);
        res.status(500).json({ error: "Errore interno del server" });
    }
};

export const getProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query("SELECT * FROM products WHERE product_id = $1", [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Prodotto non trovato" });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error("Errore nel recupero del prodotto:", error);
        res.status(500).json({ error: "Errore interno del server" });
    }
};


export const createProduct = async (req, res) => {
    try {
        const { name, code, unit_price, quantity, description, company_id, warehouse_id, iva_id } = req.body;

        if (quantity <= 0) {
            return res.status(400).json({ error: "La quantità deve essere maggiore di 0" });
        }

        const result = await pool.query(
            `INSERT INTO products (name, code, unit_price, quantity, description, company_id, warehouse_id, iva_id) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
            [name, code, unit_price, quantity, description, company_id, warehouse_id, iva_id]
        );

        res.status(201).json({ message: "Prodotto creato", product: result.rows[0] });
    } catch (error) {
        console.error("Errore nella creazione del prodotto:", error);
        res.status(500).json({ error: "Errore nel server" });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, code, unit_price, quantity, description, company_id, warehouse_id, iva_id } = req.body;

        if (quantity <= 0) {
            return res.status(400).json({ error: "La quantità deve essere maggiore di 0" });
        }

        const result = await pool.query(
            `UPDATE products 
            SET name = $1, code = $2, unit_price = $3, quantity = $4, description = $5, 
                company_id = $6, warehouse_id = $7, iva_id = $8 
            WHERE product_id = $9 RETURNING *`,
            [name, code, unit_price, quantity, description, company_id, warehouse_id, iva_id, id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Prodotto non trovato" });
        }

        res.json({ message: "Prodotto aggiornato", product: result.rows[0] });
    } catch (error) {
        console.error("Errore nell'aggiornamento del prodotto:", error);
        res.status(500).json({ error: "Errore nel server" });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query("DELETE FROM products WHERE product_id = $1", [id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Prodotto non trovato" });
        }

        res.json({ message: "Prodotto eliminato con successo" });
    } catch (error) {
        console.error("Errore nell'eliminazione del prodotto:", error);
        res.status(500).json({ error: "Errore nel server" });
    }
};
