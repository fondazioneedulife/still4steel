import express from "express";
import pool from "../config/db.js";

// Ottieni tutte le forniture
export const getSupplies = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM supplies");
        res.status(200).json(result.rows);
    } catch (error) {
        console.error("Errore nel recupero delle forniture:", error);
        res.status(500).json({ error: "Errore interno del server" });
    }
};

// Ottieni una fornitura per ID
export const getSupplyById = async (req, res) => {
    const { id } = req.params;
    
    if (isNaN(id)) {
        return res.status(400).json({ error: "ID non valido" });
    }

    try {
        const result = await pool.query("SELECT * FROM supplies WHERE supply_id = $1", [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Fornitura non trovata" });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error("Errore nel recupero della fornitura:", error);
        res.status(500).json({ error: "Errore interno del server" });
    }
};

// Crea una nuova fornitura
export const createSupply = async (req, res) => {
    try {
        const { name, code, date_release, state, supply_cost, note, product_id, supplier_id } = req.body;

        // Controllo dati obbligatori
        if (!name || !code || state === undefined || !supply_cost) {
            return res.status(400).json({ error: "Campi obbligatori mancanti" });
        }

        const result = await pool.query(
            `INSERT INTO supplies (name, code, date_release, state, supply_cost, note, product_id, supplier_id) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
            [name, code, date_release || new Date(), state, supply_cost, note, product_id, supplier_id]
        );

        res.status(201).json({ message: "Fornitura creata", supply: result.rows[0] });
    } catch (error) {
        console.error("Errore nella creazione della fornitura:", error);
        
        if (error.code === "23505") {
            return res.status(400).json({ error: "Codice già esistente" });
        }
        
        res.status(500).json({ error: "Errore nel server" });
    }
};

// Aggiorna una fornitura
export const updateSupply = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, code, date_release, state, supply_cost, note, product_id, supplier_id } = req.body;

        if (isNaN(id)) {
            return res.status(400).json({ error: "ID non valido" });
        }

        const existing = await pool.query("SELECT * FROM supplies WHERE supply_id = $1", [id]);
        if (existing.rows.length === 0) {
            return res.status(404).json({ error: "Fornitura non trovata" });
        }

        const result = await pool.query(
            `UPDATE supplies 
            SET name = $1, code = $2, date_release = $3, state = $4, supply_cost = $5, note = $6, product_id = $7, supplier_id = $8 
            WHERE supply_id = $9 RETURNING *`,
            [name, code, date_release, state, supply_cost, note, product_id, supplier_id, id]
        );

        res.json({ message: "Fornitura aggiornata", supply: result.rows[0] });
    } catch (error) {
        console.error("Errore nell'aggiornamento della fornitura:", error);
        res.status(500).json({ error: "Errore nel server" });
    }
};

// Elimina una fornitura
export const deleteSupply = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: "ID non valido" });
        }

        const existing = await pool.query("SELECT * FROM supplies WHERE supply_id = $1", [id]);
        if (existing.rows.length === 0) {
            return res.status(404).json({ error: "Fornitura non trovata" });
        }

        await pool.query("DELETE FROM supplies WHERE supply_id = $1", [id]);
        res.json({ message: "Fornitura eliminata con successo" });
    } catch (error) {
        console.error("Errore nell'eliminazione della fornitura:", error);
        res.status(500).json({ error: "Errore nel server" });
    }
};
