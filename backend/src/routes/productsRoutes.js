import express from "express";
import { 
    getAllProducts, 
    getProductById, 
    createProduct, 
    updateProduct, 
    deleteProduct 
} from "../controllers/productsController.js";
import { 
    authenticateUser, 
    validateCompanyData 
} from "../middlewares/middleware.js";


const router = express.Router();


/**
 * @swagger
 * tags:
 *   name: Products
 *   description: API per la gestione dei prodotti
 */


/**
 * @swagger
 * /products:
 *   get:
 *     summary: Ottiene tutti i prodotti
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Lista di tutti i prodotti
 *       500:
 *         description: Errore interno del server
 */
router.get("/", getAllProducts);


/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Ottiene un prodotto per ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del prodotto
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Dettagli del prodotto richiesto
 *       404:
 *         description: Prodotto non trovato
 *       500:
 *         description: Errore interno del server
 */
router.get("/:id", getProductById);


/**
 * @swagger
 * /products:
 *   post:
 *     summary: Crea un nuovo prodotto
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - code
 *               - unit_price
 *               - quantity
 *               - company_id
 *               - warehouse_id
 *               - iva_id
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nome del prodotto
 *               code:
 *                 type: string
 *                 description: Codice univoco del prodotto
 *               unit_price:
 *                 type: number
 *                 format: float
 *                 description: Prezzo unitario del prodotto
 *               quantity:
 *                 type: integer
 *                 description: Quantità disponibile (deve essere maggiore di 0)
 *               description:
 *                 type: string
 *                 description: Descrizione del prodotto
 *               company_id:
 *                 type: integer
 *                 description: ID dell'azienda proprietaria del prodotto
 *               warehouse_id:
 *                 type: integer
 *                 description: ID del magazzino in cui è conservato il prodotto
 *               iva_id:
 *                 type: integer
 *                 description: ID dell'aliquota IVA applicata al prodotto
 *     responses:
 *       201:
 *         description: Prodotto creato con successo
 *       400:
 *         description: Dati non validi
 *       500:
 *         description: Errore interno del server
 */
router.post("/", createProduct);


/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Aggiorna un prodotto esistente
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del prodotto da aggiornare
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nome aggiornato del prodotto
 *               code:
 *                 type: string
 *                 description: Codice univoco aggiornato del prodotto
 *               unit_price:
 *                 type: number
 *                 format: float
 *                 description: Prezzo unitario aggiornato
 *               quantity:
 *                 type: integer
 *                 description: Quantità disponibile aggiornata
 *               description:
 *                 type: string
 *                 description: Descrizione aggiornata del prodotto
 *               company_id:
 *                 type: integer
 *                 description: ID aggiornato dell'azienda proprietaria
 *               warehouse_id:
 *                 type: integer
 *                 description: ID aggiornato del magazzino di conservazione
 *               iva_id:
 *                 type: integer
 *                 description: ID aggiornato dell'aliquota IVA
 *     responses:
 *       200:
 *         description: Prodotto aggiornato con successo
 *       400:
 *         description: Dati non validi
 *       404:
 *         description: Prodotto non trovato
 *       500:
 *         description: Errore interno del server
 */
router.put("/:id", updateProduct);


/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Elimina un prodotto
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del prodotto da eliminare
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Prodotto eliminato con successo
 *       404:
 *         description: Prodotto non trovato
 *       500:
 *         description: Errore interno del server
 */
router.delete("/:id", deleteProduct);


export default router;