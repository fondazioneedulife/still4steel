import pool from "../config/db.js";

// Ottieni tutte le aziende
export const getToken = async (req, res) => {
    console.log("✅ GET /token chiamata"); // DEBUG
    try {
        const result = await pool.query("SELECT * FROM companies_token");
        res.status(200).json(result.rows);
    } catch (error) {
        console.error("Errore nel recupero delle aziende:", error);
        res.status(500).json({ error: "Errore interno del server" });
  }
};