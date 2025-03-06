// controllers/productsController.js
import pool from "../config/db.js";

// Ottieni tutti i prodotti
export const getProducts = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM products');
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Ottieni un prodotto per ID
export const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM products WHERE product_id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Crea un nuovo prodotto
export const createProduct = async (req, res) => {
  const { name, code, unit_price, quantity, description, company_id, warehouse_id, iva_id } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO products (name, code, unit_price, quantity, description, company_id, warehouse_id, iva_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [name, code, unit_price, quantity, description, company_id, warehouse_id, iva_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Aggiorna un prodotto
export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, code, unit_price, quantity, description, company_id, warehouse_id, iva_id } = req.body;
  try {
    const result = await pool.query(
      'UPDATE products SET name = $1, code = $2, unit_price = $3, quantity = $4, description = $5, company_id = $6, warehouse_id = $7, iva_id = $8 WHERE product_id = $9 RETURNING *',
      [name, code, unit_price, quantity, description, company_id, warehouse_id, iva_id, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Prodotto non trovato' });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Elimina un prodotto
export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM products WHERE product_id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Prodotto non trovato' });
    }
    res.status(200).json({ message: 'Prodotto eliminato con successo' });
  } catch (err) {
    console.error("Errore nell'eliminazione del prodotto:", err);
    res.status(500).json({ message: 'Server error' });
  }
};
