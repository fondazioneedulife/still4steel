import express from "express";

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
router.post("/register", (req, res) => {
  res.status(201).json({ message: "Registrazione completata" });
});

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
router.post("/login", (req, res) => {
  res.status(200).json({ token: "jwt_token" });
});

router.get("/login", (req, res) => {
  res.status(200).json({ message: "Login endpoint is active" });
});

export { router }; 
