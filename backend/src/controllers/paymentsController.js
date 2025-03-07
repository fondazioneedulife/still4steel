import pool from "../config/db.js";

// **1. Ottieni tutti i pagamenti**
export const getAllPayments = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM payments;");
        res.json(result.rows);
    } catch (error) {
        console.error("Errore nel recupero dei pagamenti:", error);
        res.status(500).json({ error: "Errore del server" });
    }
};

// **2. Ottieni un pagamento per ID**
export const getPaymentById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query(
            "SELECT * FROM payments WHERE payment_id = $1;",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Pagamento non trovato" });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error("Errore nel recupero del pagamento:", error);
        res.status(500).json({ error: "Errore del server" });
    }
};

// **3. Crea un nuovo pagamento**
export const createPayment = async (req, res) => {
    const { date_start, date_end, method, state, note } = req.body;

    try {
        const result = await pool.query(
            `INSERT INTO payments (date_start, date_end, method, state, note)
            VALUES ($1, $2, $3, $4, $5) RETURNING *;`,
            [date_start, date_end, method, state, note]
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error("Errore nella creazione del pagamento:", error);
        res.status(500).json({ error: "Errore del server" });
    }
};

// **4. Modifica un pagamento esistente**
export const updatePayment = async (req, res) => {
    const { id } = req.params;
    const { date_start, date_end, method, state, note } = req.body;

    try {
        const result = await pool.query(
            `UPDATE payments 
            SET date_start = $1, date_end = $2, method = $3, state = $4, note = $5
            WHERE payment_id = $6 RETURNING *;`,
            [date_start, date_end, method, state, note, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Pagamento non trovato" });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error("Errore nella modifica del pagamento:", error);
        res.status(500).json({ error: "Errore del server" });
    }
};

// **5. Elimina un pagamento**
export const deletePayment = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query(
            "DELETE FROM payments WHERE payment_id = $1 RETURNING *;",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Pagamento non trovato" });
        }

        res.json({ message: "Pagamento eliminato con successo" });
    } catch (error) {
        console.error("Errore nell'eliminazione del pagamento:", error);
        res.status(500).json({ error: "Errore del server" });
    }
};
