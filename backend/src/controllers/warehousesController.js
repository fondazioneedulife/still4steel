import pool from "../config/db.js";

// Ottieni tutti i magazzini
export const getAllWarehouses = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM warehouses");
        res.status(200).json(result.rows);
    } catch (error) {
        console.error("Errore nel recupero dei magazzini:", error);
        res.status(500).json({ error: "Errore interno del server" });
    }
};

// Ottieni un magazzino per ID
export const getWarehouseById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query("SELECT * FROM warehouses WHERE warehouse_id = $1", [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Magazzino non trovato" });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error("Errore nel recupero del magazzino:", error);
        res.status(500).json({ error: "Errore interno del server" });
    }
};

// Crea un nuovo magazzino
export const createWarehouse = async (req, res) => {
    try {
        const { name, address, type, note, company_id } = req.body;

        const result = await pool.query(
            `INSERT INTO warehouses (name, address, type, note, company_id) 
            VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [name, address, type, note, company_id]
        );

        res.status(201).json({ message: "Magazzino creato", warehouse: result.rows[0] });
    } catch (error) {
        console.error("Errore nella creazione del magazzino:", error);
        res.status(500).json({ error: "Errore nel server" });
    }
};

// Aggiorna un magazzino
export const updateWarehouse = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, address, type, note, company_id } = req.body;

        const result = await pool.query(
            `UPDATE warehouses 
            SET name = $1, address = $2, type = $3, note = $4, company_id = $5 
            WHERE warehouse_id = $6 RETURNING *`,
            [name, address, type, note, company_id, id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Magazzino non trovato" });
        }

        res.json({ message: "Magazzino aggiornato", warehouse: result.rows[0] });
    } catch (error) {
        console.error("Errore nell'aggiornamento del magazzino:", error);
        res.status(500).json({ error: "Errore nel server" });
    }
};

// Elimina un magazzino
export const deleteWarehouse = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query("DELETE FROM warehouses WHERE warehouse_id = $1", [id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Magazzino non trovato" });
        }

        res.json({ message: "Magazzino eliminato con successo" });
    } catch (error) {
        console.error("Errore nell'eliminazione del magazzino:", error);
        res.status(500).json({ error: "Errore nel server" });
    }
};