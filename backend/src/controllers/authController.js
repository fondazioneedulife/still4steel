import crypto from "crypto";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pool from "../config/db.js";

export const registerAccount = async (req, res) => {
  try {
    const { name, vat, tax_code, phone, email, address, password } = req.body;

    // Controllo se l'email esiste già
    const checkUser = await pool.query("SELECT * FROM companies WHERE email = $1", [email]);
    if (checkUser.rows.length > 0) {
      return res.status(400).json({ error: "Email già in uso" });
    }

    // Hash della password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Inserimento nel database
    const newUser = await pool.query(
      `INSERT INTO companies (name, vat, tax_code, phone, email, address, password)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING company_id, name, email`,
      [name, vat, tax_code, phone, email, address, hashedPassword]
    );

    // Genera un token JWT per il nuovo utente
    const token = jwt.sign(
      { login_id: newUser.rows[0].company_id, email: newUser.rows[0].email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Inserisce il token nella tabella companies_token
    const newToken = await pool.query(
      `INSERT INTO companies_token (token, company_id)
       VALUES ($1, $2)
       RETURNING token, company_id`,
      [token, newUser.rows[0].company_id]
    );

    res.status(201).json({ message: "Registrazione completata", user: newUser.rows[0], token: newToken.rows[0].token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Errore server" });
  }
};
  
export const loginAccount = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Controllo se l'utente esiste
    const userQuery = await pool.query("SELECT * FROM companies WHERE email = $1", [email]);
    if (userQuery.rows.length === 0) {
      return res.status(401).json({ error: "Utente non trovato" });
    }

    const user = userQuery.rows[0];

    // Verifica della password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: "Credenziali errate" });
    }

    // Generazione del token JWT
    const token = jwt.sign(
      { login_id: user.company_id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Controlla se un token esiste già per questo utente
    const existingTokenQuery = await pool.query(
      "SELECT * FROM companies_token WHERE company_id = $1",
      [user.company_id]
    );

    if (existingTokenQuery.rows.length > 0) {
      // Se un token esiste già, aggiornalo
      const updateTokenQuery = await pool.query(
        "UPDATE companies_token SET token = $1 WHERE company_id = $2",
        [token, user.company_id]
      );
      return res.status(200).json({ message: "Login effettuato", token });
    } else {
      // Altrimenti, inserisci un nuovo token
      const newUser = await pool.query(
        `INSERT INTO companies_token (token, company_id)
         VALUES ($1, $2)
         RETURNING token, company_id`,
        [token, user.company_id]
      );
      return res.status(201).json({ message: "Registrazione completata", user: newUser.rows[0] });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Errore server" });
  }
};

// Middleware per proteggere le rotte con JWT
export const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
  
    if (!token) return res.status(401).json({ error: "Accesso negato, token mancante" });
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (error) {
      res.status(401).json({ error: "Token non valido" });
    }
};