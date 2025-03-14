import express from "express";
import dotenv from "dotenv";
import {
    registerAccount,
    loginAccount,
} from "../controllers/authController.js";
import {
    forgotPassword,
    resetPassword
} from "../controllers/authlogin.js";

dotenv.config();
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: API per l'autenticazione
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registra una nuova azienda
 *     description: Crea un nuovo account aziendale nel gestionale.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Azienda XYZ"
 *               email:
 *                 type: string
 *                 example: "azienda@example.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       201:
 *         description: Registrazione avvenuta con successo
 *       400:
 *         description: Errore nei dati di registrazione
 */

router.post("/register", registerAccount);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Effettua il login
 *     description: Permette a un'azienda di autenticarsi nel sistema.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "azienda@example.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Login effettuato con successo
 *       401:
 *         description: Credenziali errate
 */

router.post("/login", loginAccount);

router.post("/forgot-password", forgotPassword);

router.post("/reset-password/:token", resetPassword);

export { router };