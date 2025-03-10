import express from "express";
import pool from "../config/db.js";

// Ottieni tutte le associazioni azienda-fornitura
export const getCompanySupplies = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM company_supply");
        res.status(200).json(result.rows);
    } catch (error) {
        console.error("Errore nel recupero delle associazioni azienda-fornitura:", error);
        res.status(500).json({ error: "Errore interno del server" });
    }
};

// Ottieni un'associazione azienda-fornitura per ID
export const getCompanySupplyById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query("SELECT * FROM company_supply WHERE company_supply_id = $1", [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Associazione non trovata" });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error("Errore nel recupero dell'associazione:", error);
        res.status(500).json({ error: "Errore interno del server" });
    }
};

// Crea una nuova associazione azienda-fornitura
export const createCompanySupply = async (req, res) => {
    try {
        const { company_id, supply_id } = req.body;
        const result = await pool.query(
            `INSERT INTO company_supply (company_id, supply_id) 
            VALUES ($1, $2) RETURNING *`,
            [company_id, supply_id]
        );
        res.status(201).json({ message: "Associazione creata", companySupply: result.rows[0] });
    } catch (error) {
        console.error("Errore nella creazione dell'associazione:", error);
        res.status(500).json({ error: "Errore nel server" });
    }
};

// Aggiorna un'associazione azienda-fornitura
export const updateCompanySupply = async (req, res) => {
    try {
        const { id } = req.params;
        const { company_id, supply_id } = req.body;
        const result = await pool.query(
            `UPDATE company_supply 
            SET company_id = $1, supply_id = $2 
            WHERE company_supply_id = $3 RETURNING *`,
            [company_id, supply_id, id]
        );
        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Associazione non trovata" });
        }
        res.json({ message: "Associazione aggiornata", companySupply: result.rows[0] });
    } catch (error) {
        console.error("Errore nell'aggiornamento dell'associazione:", error);
        res.status(500).json({ error: "Errore nel server" });
    }
};

// Elimina un'associazione azienda-fornitura
export const deleteCompanySupply = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query("DELETE FROM company_supply WHERE company_supply_id = $1", [id]);
        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Associazione non trovata" });
        }
        res.json({ message: "Associazione eliminata con successo" });
    } catch (error) {
        console.error("Errore nell'eliminazione dell'associazione:", error);
        res.status(500).json({ error: "Errore nel server" });
    }
};