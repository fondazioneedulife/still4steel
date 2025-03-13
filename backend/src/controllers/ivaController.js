import pool from "../config/db.js";


export const getAllIvas = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM iva');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Errore nel recupero dei magazzini:", error);
    res.status(500).json({ error: "Errore interno del server"  });
  }
};

export const getIvaById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM iva WHERE iva_id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'IVA not found' });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const createIva = async (req, res) => {
  const { rate, description } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO iva (rate, description) VALUES ($1, $2) RETURNING *',
      [rate, description]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateIva = async (req, res) => {
  const { id } = req.params;
  const { rate, description } = req.body;
  try {
    const result = await pool.query(
      'UPDATE iva SET rate = $1, description = $2 WHERE iva_id = $3 RETURNING *',
      [rate, description, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'IVA not found' });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteIva = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM iva WHERE iva_id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'IVA not found' });
    }
    res.status(200).json({ message: 'IVA deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};