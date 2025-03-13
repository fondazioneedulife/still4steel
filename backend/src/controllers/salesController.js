import express from "express";
import pool from "../config/db.js";

// Ottieni tutte le vendite
export const getSales = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM sales");
        res.status(200).json(result.rows);
    } catch (error) {
        console.error("Errore nel recupero delle vendite:", error);
        res.status(500).json({ error: "Errore interno del server" });
    }
};

// Ottieni una vendita per ID
export const getSaleById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query("SELECT * FROM sales WHERE sale_id = $1", [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Vendita non trovata" });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error("Errore nel recupero della vendita:", error);
        res.status(500).json({ error: "Errore interno del server" });
    }
};

// Crea una nuova vendita
export const createSale = async (req, res) => {
    try {
        const { tax, online, note, payment_id, order_id } = req.body;
        const result = await pool.query(
            `INSERT INTO sales (tax, online, note, payment_id, order_id) 
            VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [tax, online, note, payment_id, order_id]
        );
        res.status(201).json({ message: "Vendita creata", sale: result.rows[0] });
    } catch (error) {
        console.error("Errore nella creazione della vendita:", error);
        res.status(500).json({ error: "Errore nel server" });
    }
};

// Aggiorna una vendita
export const updateSale = async (req, res) => {
    try {
        const { id } = req.params;
        const { tax, online, note, payment_id, order_id } = req.body;
        const result = await pool.query(
            `UPDATE sales 
            SET tax = $1, online = $2, note = $3, payment_id = $4, order_id = $5
            WHERE sale_id = $6 RETURNING *`,
            [tax, online, note, payment_id, order_id, id]
        );
        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Vendita non trovata" });
        }
        res.json({ message: "Vendita aggiornata", sale: result.rows[0] });
    } catch (error) {
        console.error("Errore nell'aggiornamento della vendita:", error);
        res.status(500).json({ error: "Errore nel server" });
    }
};

// Elimina una vendita
export const deleteSale = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query("DELETE FROM sales WHERE sale_id = $1", [id]);
        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Vendita non trovata" });
        }
        res.json({ message: "Vendita eliminata con successo" });
    } catch (error) {
        console.error("Errore nell'eliminazione della vendita:", error);
        res.status(500).json({ error: "Errore nel server" });
    }
};
