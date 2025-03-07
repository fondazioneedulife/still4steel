import pool from "../config/db.js";


export const getCategories = async (req, res) => {
    console.log("✅ GET /categories chiamata"); // DEBUG
    try {
        const result = await pool.query("SELECT * FROM categories");
        res.status(200).json(result.rows);
    } catch (error) {
        console.error("Errore nel recupero delle categorie:", error);
        res.status(500).json({ error: "Errore interno del server" });
    }
};

export const getCategoryById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query("SELECT * FROM categories WHERE category_id = $1", [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Categoria non trovata" });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error("Errore nel recupero della categoria:", error);
        res.status(500).json({ error: "Errore interno del server" });
    }
};

export const createCategory = async (req, res) => {
    try {
        const { name, description } = req.body;

        if (!name) {
            return res.status(400).json({ error: "Il nome della categoria è obbligatorio" });
        }

        const result = await pool.query(
            "INSERT INTO categories (name, description) VALUES ($1, $2) RETURNING *",
            [name, description]
        );

        res.status(201).json({ message: "Categoria creata", category: result.rows[0] });
    } catch (error) {
        console.error("Errore nella creazione della categoria:", error);
        res.status(500).json({ error: "Errore nel server" });
    }
};

export const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;

        if (!name) {
            return res.status(400).json({ error: "Il nome della categoria è obbligatorio" });
        }

        const result = await pool.query(
            "UPDATE categories SET name = $1, description = $2 WHERE category_id = $3 RETURNING *",
            [name, description, id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Categoria non trovata" });
        }

        res.json({ message: "Categoria aggiornata", category: result.rows[0] });
    } catch (error) {
        console.error("Errore nell'aggiornamento della categoria:", error);
        res.status(500).json({ error: "Errore nel server" });
    }
};

export const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query("DELETE FROM categories WHERE category_id = $1", [id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Categoria non trovata" });
        }

        res.json({ message: "Categoria eliminata con successo" });
    } catch (error) {
        console.error("Errore nell'eliminazione della categoria:", error);
        res.status(500).json({ error: "Errore nel server" });
    }
};
