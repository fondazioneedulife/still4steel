import pool from "../config/db.js";

// Ottieni tutte le aziende
export const getAllCompanies = async (req, res) => {
    console.log("✅ GET /companies chiamata"); // DEBUG
    try {
        const result = await pool.query("SELECT * FROM companies");
        res.status(200).json(result.rows);
    } catch (error) {
        console.error("Errore nel recupero delle aziende:", error);
        res.status(500).json({ error: "Errore interno del server" });
  }
};

// Ottieni un'azienda per ID
export const getCompanyById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM companies WHERE company_id = $1", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Azienda non trovata" });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Errore nel recupero dell'azienda:", error);
    res.status(500).json({ error: "Errore interno del server" });
  }
};

// Crea una nuova azienda
export const createCompany = async (req, res) => {
  try {
    const { 
      name, vat, tax_code, phone, email, address, 
      password, password_confirm, note 
    } = req.body;

    if (password !== password_confirm) {
      return res.status(400).json({ error: "Le password non corrispondono" });
    }

    const result = await pool.query(
      `INSERT INTO companies 
        (name, vat, tax_code, phone, email, address, password, password_confirm, note) 
      VALUES 
        ($1, $2, $3, $4, $5, $6, $7, $8, $9) 
      RETURNING *`,
      [name, vat, tax_code, phone, email, address, password, password_confirm, note]
    );

    res.status(201).json({ message: "Azienda creata", company: result.rows[0] });
  } catch (error) {
    console.error("Errore nella creazione dell'azienda:", error);
    res.status(500).json({ error: "Errore nel server" });
  }
};

// Aggiorna un'azienda
export const updateCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const result = await pool.query(
      "UPDATE companies SET name = $1 WHERE company_id = $2 RETURNING *",
      [name, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Azienda non trovata" });
    }

    res.json({ message: "Azienda aggiornata", company: result.rows[0] });
  } catch (error) {
    console.error("Errore nell'aggiornamento dell'azienda:", error);
    res.status(500).json({ error: "Errore nel server" });
  }
};

// Elimina un'azienda
export const deleteCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("DELETE FROM companies WHERE company_id = $1", [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Azienda non trovata" });
    }

    res.json({ message: "Azienda eliminata con successo" });
  } catch (error) {
    console.error("Errore nell'eliminazione dell'azienda:", error);
    res.status(500).json({ error: "Errore nel server" });
  } 
};

