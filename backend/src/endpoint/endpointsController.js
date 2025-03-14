import pool from "../config/db.js";

// Ottieni tutti i clienti della compagnia
export const getCompaniesCustumer = async (req, res) => {
    const { company_id } = req.params;
    try {
        const result = await pool.query(
            `SELECT c.* 
            FROM customers c
            JOIN company_customer cc ON c.customer_id = cc.customer_id
            WHERE cc.company_id = $1;`, 
            [company_id]
        );
        res.json(result.rows);
    } catch (error) {
        console.error("Errore nel recupero dei clienti:", error);
        res.status(500).json({ error: "Errore interno del server" });
    }
};

// Ottieni tutti i magazzini della compagnia
export const getCompaniesWarehouse =  async (req, res) => {
    const { company_id } = req.params;
    try {
        const result = await pool.query(
            "SELECT * FROM warehouses WHERE company_id = $1;", 
            [company_id]
        );
        res.json(result.rows);
    } catch (error) {
        console.error("Errore nel recupero dei magazzini:", error);
        res.status(500).json({ error: "Errore interno del server" });
    }
};

// Ottieni tutti i prodotti della compagnia (inclusi magazzino e IVA)
export const getCompaniesProduct = async (req, res) => {
    const { company_id } = req.params;
    try {
        const result = await pool.query(
            `SELECT p.*, w.name AS warehouse_name, i.rate AS rate
            FROM products p
            JOIN warehouses w ON p.warehouse_id = w.warehouse_id
            JOIN iva i ON p.iva_id = i.iva_id
            WHERE p.company_id = $1;`, 
            [company_id]
        );
        res.json(result.rows);
    } catch (error) {
        console.error("Errore nel recupero dei prodotti:", error);
        res.status(500).json({ error: "Errore interno del server" });
    }
};

// Ottieni tutte le categorie dei prodotti della compagnia
export const getProductCategory = async (req, res) => {
    const { company_id } = req.params;
    try {
        const result = await pool.query(
            `SELECT DISTINCT cat.*
            FROM categories cat
            JOIN product_category pc ON cat.category_id = pc.category_id
            JOIN products p ON pc.product_id = p.product_id
            WHERE p.company_id = $1;`, 
            [company_id]
        );
        res.json(result.rows);
    } catch (error) {
        console.error("Errore nel recupero delle categorie:", error);
        res.status(500).json({ error: "Errore interno del server" });
    }
};

// Ottieni tutti gli sconti applicati ai prodotti della compagnia
export const getProductDiscount = async (req, res) => {
    const { company_id } = req.params;
    try {
        const result = await pool.query(
            `SELECT d.*
            FROM discounts d
            JOIN product_discount pd ON d.discount_id = pd.discount_id
            JOIN products p ON pd.product_id = p.product_id
            WHERE p.company_id = $1;`, 
            [company_id]
        );
        res.json(result.rows);
    } catch (error) {
        console.error("Errore nel recupero degli sconti:", error);
        res.status(500).json({ error: "Errore interno del server" });
    }
};

// Ottieni tutti gli ordini di una compagnia
export const getOrdersByCompany = async (req, res) => {
  const { company_id } = req.params;
  try {
    const result = await pool.query(
      `SELECT o.order_id, o.date, c.first_name, c.last_name
      FROM orders o
      JOIN company_customer cc ON o.customer_id = cc.customer_id
      JOIN customers c ON c.customer_id = o.customer_id
      WHERE cc.company_id = $1`,
      [company_id]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Errore nel recupero degli ordini:", error);
    res.status(500).json({ error: "Errore nel server" });
  }
};

// Ottieni tutti i prodotti con disponibilità bassa
export const getLowStockProducts = async (req, res) => {
  const { company_id } = req.params;
  const { threshold = 5 } = req.query; // Default: meno di 5 unità
  try {
    const result = await pool.query(
      `SELECT p.product_id, p.name, p.quantity, w.name AS warehouse_name
      FROM products p
      JOIN warehouses w ON p.warehouse_id = w.warehouse_id
      WHERE w.company_id = $1 AND p.quantity < $2`,
      [company_id, threshold]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Errore nel recupero dei prodotti con stock basso:", error);
    res.status(500).json({ error: "Errore nel server" });
  }
};

// Ottieni il totale delle vendite per una compagnia
export const getTotalRevenue = async (req, res) => {
  const { company_id } = req.params;
  const { start_date, end_date } = req.query;
  try {
    const result = await pool.query(
      `SELECT SUM(o.total_amount) AS total_revenue
      FROM orders o
      JOIN company_customer cc ON o.customer_id = cc.customer_id
      WHERE cc.company_id = $1 AND o.date BETWEEN $2 AND $3`,
      [company_id, start_date, end_date]
    );
    res.status(200).json({ total_revenue: result.rows[0].total_revenue || 0 });
  } catch (error) {
    console.error("Errore nel calcolo delle vendite:", error);
    res.status(500).json({ error: "Errore nel server" });
  }
};
