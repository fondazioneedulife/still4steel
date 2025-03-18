import pool from "../config/db.js";

export const getAllProdotti = async (req, res) => {
    console.log("✅ GET /prodotti chiamata"); // DEBUG
    try {
        const result = await pool.query("SELECT * FROM prodotti");
        res.status(200).json(result.rows);
    } catch (error) {
        console.error("Errore nel recupero dei prodotti:", error);
        res.status(500).json({ error: "Errore interno del server" });
    }
};

export const getProdottoById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query("SELECT * FROM prodotti WHERE product_id = $1", [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Prodotto non trovato" });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error("Errore nel recupero del prodotto:", error);
        res.status(500).json({ error: "Errore interno del server" });
    }
};

export const createProdotto = async (req, res) => {
    try {
      console.log("Dati ricevuti nel backend:", req.body);
  
      const { prodotto, magazzino, fornitore } = req.body;
  
      if (!prodotto?.nomeProdotto) {
        return res.status(400).json({ error: "Il nome del prodotto è obbligatorio" });
      }
  
      const nuovoProdotto = await pool.query(
        `INSERT INTO prodotti (nome, sku, brand, descrizione, prezzoAcquisto, prezzoVendita, quantita, quantitaMinima, nomeFornitore, codice_fornitore, emailFornitore, telefonoFornitore) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *`,
        [
          prodotto.nomeProdotto,  // $1
          prodotto.sku,           // $2
          prodotto.brand,         // $4
          prodotto.descrizione,   // $5
          prodotto.prezzoAcquisto,// $6
          prodotto.prezzoVendita, // $7
          magazzino.quantita,     // $9
          magazzino.quantitaMinima, // $10
          fornitore.nomeFornitore, // $11
          fornitore.codiceFornitore, // $12
          fornitore.emailFornitore, // $13
          fornitore.telefonoFornitore // $14
        ]
      );
  
      res.json(nuovoProdotto.rows[0]);
    } catch (error) {
      console.error("Errore nella creazione del prodotto:", error);
      res.status(500).json({ error: "Errore del server" });
    }
  };
  

export const updateProdotto = async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, sku, category_id, brand, descrizione, prezzoAcquisto, prezzoVendita, iva_id, quantita, quantitaMinima, nomeFornitore, codice_fornitore, emailFornitore, telefonoFornitore } = req.body;

        const result = await pool.query(
            `UPDATE prodotti 
            SET nome = $1, sku = $2, category_id = $3, brand = $4, descrizione = $5, prezzoAcquisto = $6, prezzoVendita = $7, iva_id = $8, quantita = $9, quantitaMinima = $10, nomeFornitore = $11, codice_fornitore = $12, emailFornitore = $13, telefonoFornitore = $14 
            WHERE product_id = $16 RETURNING *`,
            [nome, sku, category_id, brand, descrizione, prezzoAcquisto, prezzoVendita, iva_id, quantita, quantitaMinima, nomeFornitore, codice_fornitore, emailFornitore, telefonoFornitore]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Prodotto non trovato" });
        }

        res.json({ message: "Prodotto aggiornato", product: result.rows[0] });
    } catch (error) {
        console.error("Errore nell'aggiornamento del prodotto:", error);
        res.status(500).json({ error: "Errore nel server" });
    }
};

export const deleteProdotto = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query("DELETE FROM prodotti WHERE id = $1", [id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Prodotto non trovato" });
        }

        res.json({ message: "Prodotto eliminato con successo" });
    } catch (error) {
        console.error("Errore nell'eliminazione del prodotto:", error);
        res.status(500).json({ error: "Errore nel server" });
    }
};