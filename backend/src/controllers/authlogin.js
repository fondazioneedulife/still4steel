import crypto from "crypto";
import nodemailer from "nodemailer";
import pool from "../config/db.js"; // Assumendo che usi pg per PostgreSQL
import dotenv from "dotenv";
import bcrypt from "bcrypt";

dotenv.config();

export const forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        // Verifica se l'email esiste
        const result = await pool.query("SELECT company_id FROM companies WHERE email = $1", [email]);

        if (result.rows.length === 0) {
            return res.status(400).json({ message: "Email non trovata" });
        }

        const companyId = result.rows[0].company_id;

        // Genera un token univoco e una scadenza
        const resetToken = crypto.randomBytes(32).toString("hex");
        const expiresAt = new Date(Date.now() + 3600000); // 1 ora

        // Salva il token nel database
        await pool.query(
            "INSERT INTO companies_token (token, expires_at, company_id) VALUES ($1, $2, $3)",
            [resetToken, expiresAt, companyId]
        );

        // Configura il trasportatore per le email
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: { 
                user: 'alessandronicolis1@gmail.com', 
                pass: 'bqae bpij mill dhmk'
            },
        });

        //const resetLink = `http://localhost:3001/reset-password?token=${resetToken}`;

        // Invia email
        await transporter.sendMail({
            from: "alessandronicolis1@gmail.com",
            to: "ggiulia.mmazzi@gmail.com",
            subject: "Recupero password",
            html: `<p>Per reimpostare la tua password, clicca qui: Reset Password</p>`,
        }).then(() => {
            console.log('email sent');
        }).catch(err => {
            console.error(err);
        })

        res.json({ message: "Email di recupero inviata" });
    } catch (error) {
        console.error("Errore nel recupero password:", error);
        res.status(500).json({ message: "Errore del server" });
    }
};

export const resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;

    try {
        // Verifica se il token esiste e non è scaduto
        const result = await pool.query(
            "SELECT company_id FROM companies_token WHERE token = $1 AND expires_at > NOW()",
            [token]
        );

        if (result.rows.length === 0) {
            return res.status(400).json({ message: "Token non valido o scaduto" });
        }

        const companyId = result.rows[0].company_id;

        // Hash della nuova password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Aggiorna la password
        await pool.query("UPDATE companies SET password = $1 WHERE company_id = $2", [
            hashedPassword,
            companyId,
        ]);

        // Rimuove il token usato
        await pool.query("DELETE FROM companies_token WHERE token = $1", [token]);

        res.json({ message: "Password aggiornata con successo" });
    } catch (error) {
        console.error("Errore nel reset della password:", error);
        res.status(500).json({ message: "Errore del server" });
    }
};