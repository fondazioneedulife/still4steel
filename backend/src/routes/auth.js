import express from "express";
import dotenv from "dotenv";
import {
    registerAccount,
    loginAccount,
    forgetPassword,
    resetPassword
} from "../controllers/authController.js";

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
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Registrazione avvenuta con successo
 *       400:
 *         description: Email già in uso o errore nei dati
 */

router.post("/register", registerAccount);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Effettua il login
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
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login effettuato con successo
 *       401:
 *         description: Credenziali errate
 */

router.post("/login", loginAccount);

router.post("/forgot-password", forgetPassword);

router.post("/reset-password/:token", resetPassword);

export { router };
