import express from "express";
import pool from "../config/db.js";

// Ottieni tutti i fornitori
export const getSuppliers = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM suppliers");
        res.status(200).json(result.rows);
    } catch (error) {
        console.error("Errore nel recupero dei fornitori:", error);
        res.status(500).json({ error: "Errore interno del server" });
    }
};

// Ottieni un fornitore per ID
export const getSupplierById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query("SELECT * FROM suppliers WHERE supplier_id = $1", [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Fornitore non trovato" });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error("Errore nel recupero del fornitore:", error);
        res.status(500).json({ error: "Errore interno del server" });
    }
};

// Crea un nuovo fornitore
export const createSupplier = async (req, res) => {
    try {
        const { first_name, last_name, email, phone, note } = req.body;
        const result = await pool.query(
            `INSERT INTO suppliers (first_name, last_name, email, phone, note) 
            VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [first_name, last_name, email, phone, note]
        );
        res.status(201).json({ message: "Fornitore creato", supplier: result.rows[0] });
    } catch (error) {
        console.error("Errore nella creazione del fornitore:", error);
        res.status(500).json({ error: "Errore nel server" });
    }
};

// Aggiorna un fornitore
export const updateSupplier = async (req, res) => {
    try {
        const { id } = req.params;
        const { first_name, last_name, email, phone, note } = req.body;
        const result = await pool.query(
            `UPDATE suppliers 
            SET first_name = $1, last_name = $2, email = $3, phone = $4, note = $5 
            WHERE supplier_id = $6 RETURNING *`,
            [first_name, last_name, email, phone, note, id]
        );
        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Fornitore non trovato" });
        }
        res.json({ message: "Fornitore aggiornato", supplier: result.rows[0] });
    } catch (error) {
        console.error("Errore nell'aggiornamento del fornitore:", error);
        res.status(500).json({ error: "Errore nel server" });
    }
};

// Elimina un fornitore
export const deleteSupplier = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query("DELETE FROM suppliers WHERE supplier_id = $1", [id]);
        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Fornitore non trovato" });
        }
        res.json({ message: "Fornitore eliminato con successo" });
    } catch (error) {
        console.error("Errore nell'eliminazione del fornitore:", error);
        res.status(500).json({ error: "Errore nel server" });
    }
};