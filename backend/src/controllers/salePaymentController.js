import express from "express";
import pool from "../config/db.js";

// Ottieni tutte le transazioni di pagamento
export const getSalePayments = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM sale_payment");
        res.status(200).json(result.rows);
    } catch (error) {
        console.error("Errore nel recupero delle transazioni di pagamento:", error);
        res.status(500).json({ error: "Errore interno del server" });
    }
};

// Ottieni una transazione di pagamento per ID
export const getSalePaymentById = async (req, res) => {
    const { id } = req.params;
    
    if (isNaN(id)) {
        return res.status(400).json({ error: "ID non valido" });
    }

    try {
        const result = await pool.query("SELECT * FROM sale_payment WHERE sale_payment_id = $1", [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Transazione di pagamento non trovata" });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error("Errore nel recupero della transazione di pagamento:", error);
        res.status(500).json({ error: "Errore interno del server" });
    }
};

// Crea una nuova transazione di pagamento
export const createSalePayment = async (req, res) => {
    try {
        const { sale_id, payment_id } = req.body;

        // Controllo dati obbligatori
        if (!sale_id || !payment_id) {
            return res.status(400).json({ error: "Campi obbligatori mancanti" });
        }

        const result = await pool.query(
            `INSERT INTO sale_payment (sale_id, payment_id) 
            VALUES ($1, $2) RETURNING *`,
            [sale_id, payment_id]
        );

        res.status(201).json({ message: "Transazione di pagamento creata", sale_payment: result.rows[0] });
    } catch (error) {
        console.error("Errore nella creazione della transazione di pagamento:", error);
        
        if (error.code === "23503") {
            return res.status(400).json({ error: "ID vendita o pagamento non valido" });
        }
        
        res.status(500).json({ error: "Errore nel server" });
    }
};

// Aggiorna una transazione di pagamento
export const updateSalePayment = async (req, res) => {
    try {
        const { id } = req.params;
        const { sale_id, payment_id } = req.body;

        if (isNaN(id)) {
            return res.status(400).json({ error: "ID non valido" });
        }

        const existing = await pool.query("SELECT * FROM sale_payment WHERE sale_payment_id = $1", [id]);
        if (existing.rows.length === 0) {
            return res.status(404).json({ error: "Transazione di pagamento non trovata" });
        }

        const result = await pool.query(
            `UPDATE sale_payment 
            SET sale_id = $1, payment_id = $2
            WHERE sale_payment_id = $3 RETURNING *`,
            [sale_id, payment_id, id]
        );

        res.json({ message: "Transazione di pagamento aggiornata", sale_payment: result.rows[0] });
    } catch (error) {
        console.error("Errore nell'aggiornamento della transazione di pagamento:", error);
        res.status(500).json({ error: "Errore nel server" });
    }
};

// Elimina una transazione di pagamento
export const deleteSalePayment = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: "ID non valido" });
        }

        const existing = await pool.query("SELECT * FROM sale_payment WHERE sale_payment_id = $1", [id]);
        if (existing.rows.length === 0) {
            return res.status(404).json({ error: "Transazione di pagamento non trovata" });
        }

        await pool.query("DELETE FROM sale_payment WHERE sale_payment_id = $1", [id]);
        res.json({ message: "Transazione di pagamento eliminata con successo" });
    } catch (error) {
        console.error("Errore nell'eliminazione della transazione di pagamento:", error);
        res.status(500).json({ error: "Errore nel server" });
    }
};