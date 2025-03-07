import crypto from "crypto";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pool from "../config/db.js";


export const registerAccount = async (req, res) => {
    try {
      const { name, vat, tax_code, phone, email, address, password } = req.body;
  
      // Controllo se l'email esiste già
      const checkUser = await pool.query("SELECT * FROM login WHERE email = $1", [email]);
      if (checkUser.rows.length > 0) {
        return res.status(400).json({ error: "Email già in uso" });
      }
  
      // Hash della password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Inserimento nel database
      const newUser = await pool.query(
        `INSERT INTO login (name, phone, email, address, password)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING login_id, name, email`,
        [name, phone, email, address, hashedPassword]
      );
  
      res.status(201).json({ message: "Registrazione completata", user: newUser.rows[0] });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Errore server" });
    }
};
  
export const loginAccount = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Controllo se l'utente esiste
      const userQuery = await pool.query("SELECT * FROM login WHERE email = $1", [email]);
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
        { login_id: user.login_id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
  
      res.status(200).json({ message: "Login effettuato", token });
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

// 📌 Recupero password
export const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Controllo se l'utente esiste
    const userQuery = await pool.query("SELECT * FROM login WHERE email = $1", [email]);
    if (userQuery.rows.length === 0) {
      return res.status(404).json({ error: "Email non trovata" });
    }

    // Generazione di un token
    const resetToken = crypto.randomBytes(32).toString("hex");

    // Salva il token nel database
    await pool.query(
      `INSERT INTO password_resets (email, reset_token)
       VALUES ($1, $2)
       ON CONFLICT (email) DO UPDATE SET reset_token = EXCLUDED.reset_token, created_at = CURRENT_TIMESTAMP`,
      [email, resetToken]
    );

    // Configurazione del servizio email con Nodemailer
    const transporter = nodemailer.createTransport({
      service: "Gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
      },
    });


    const resetLink = `http://localhost:3001/api/auth/reset-password/${resetToken}`;
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Recupero Password",
      text: `Clicca su questo link per reimpostare la tua password: ${resetLink}`,
    });

    res.status(200).json({ message: "Email di recupero inviata" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Errore server" });
  }
};

export const resetPassword = async (req, res) => {
    try {
      const { token } = req.params;
      const { password } = req.body;
  
      // Controllo se il token esiste nel database
      const tokenQuery = await pool.query("SELECT email FROM password_resets WHERE reset_token = $1", [token]);
      if (tokenQuery.rows.length === 0) {
        return res.status(400).json({ error: "Token non valido o scaduto" });
      }
  
      const email = tokenQuery.rows[0].email;
  
      // Hash della nuova password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Aggiorna la password nel database
      await pool.query("UPDATE login SET password = $1 WHERE email = $2", [hashedPassword, email]);
  
      // Cancella il token usato
      await pool.query("DELETE FROM password_resets WHERE email = $1", [email]);
  
      res.status(200).json({ message: "Password aggiornata con successo" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Errore server" });
    }
}; 