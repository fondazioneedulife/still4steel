import express from "express";
import { 
    getCompaniesCustumer,
    getCompaniesWarehouse,
    getCompaniesProduct,
    getProductCategory,
    getProductDiscount,
    getOrdersByCompany,
    getLowStockProducts,
    getTotalRevenue
} from "./endpointsController.js";
const router = express.Router();

/**
 * @swagger
 * /companies/{company_id}/customers:
 *   get:
 *     summary: Ottieni tutti i clienti di una compagnia
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: company_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID della compagnia
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Filtra per nome cliente
 *     responses:
 *       200:
 *         description: Lista di clienti
 *       500:
 *         description: Errore del server
 */

router.get("/companies/:company_id/customers", getCompaniesCustumer);

/** 
* @swagger
* /companies/{company_id}/warehouses:
*   get:
*     summary: Ottieni tutti i magazzini di una compagnia
*     tags: [Warehouses]
*     parameters:
*       - in: path
*         name: company_id
*         required: true
*         schema:
*           type: integer
*       - in: query
*         name: type
*         schema:
*           type: string
*         description: Filtra per tipo di magazzino
*     responses:
*       200:
*         description: Lista di magazzini
*       500:
*         description: Errore del server
*/

router.get("/companies/:company_id/warehouses", getCompaniesWarehouse);

/** 
* @swagger
* /companies/{company_id}/products:
*   get:
*     summary: Ottieni tutti i prodotti di una compagnia
*     tags: [Products]
*     parameters:
*       - in: path
*         name: company_id
*         required: true
*         schema:
*           type: integer
*       - in: query
*         name: warehouse_id
*         schema:
*           type: integer
*         description: Filtra per ID magazzino
*       - in: query
*         name: min_price
*         schema:
*           type: number
*         description: Prezzo minimo
*       - in: query
*         name: max_price
*         schema:
*           type: number
*         description: Prezzo massimo
*     responses:
*       200:
*         description: Lista di prodotti
*       500:
*         description: Errore del server
*/

router.get("/companies/:company_id/products", getCompaniesProduct);

/**
 * @swagger
 * /companies/{company_id}/categories:
 *   get:
 *     summary: Ottieni tutte le categorie di una compagnia
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: company_id
 *         required: true
 *         schema:
 *           type: integer
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Filtra per nome della categoria
 *     responses:
 *       200:
 *         description: Lista di categorie
 *       500:
 *         description: Errore del server
 */
 
router.get("/companies/:company_id/categories", getProductCategory);

/**
 * @swagger
 * /companies/{company_id}/discounts:
 *   get:
 *     summary: Ottieni tutti gli sconti di una compagnia
 *     tags: [Discounts]
 *     parameters:
 *       - in: path
 *         name: company_id
 *         required: true
 *         schema:
 *           type: integer
 *       - in: query
 *         name: state
 *         schema:
 *           type: string
 *         description: Filtra per stato dello sconto
 *       - in: query
 *         name: date_start
 *         schema:
 *           type: string
 *           format: date
 *         description: Filtra per data di inizio sconto
 *     responses:
 *       200:
 *         description: Lista di sconti
 *       500:
 *         description: Errore del server
 */

router.get("/companies/:company_id/discounts", getProductDiscount);

/**
 * @swagger
 * /companies/{company_id}/orders:
 *   get:
 *     summary: Ottieni tutti gli ordini di una compagnia
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: company_id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista di ordini
 *       500:
 *         description: Errore del server
 */

router.get("/:company_id/orders", getOrdersByCompany);

/**
 * @swagger
 * /companies/{company_id}/low-stock:
 *   get:
 *     summary: Ottieni tutti i prodotti con quantità bassa
 *     tags: [Stock]
 *     parameters:
 *       - in: path
 *         name: company_id
 *         required: true
 *         schema:
 *           type: integer
 *       - in: query
 *         name: threshold
 *         schema:
 *           type: integer
 *         description: Soglia di quantità per segnalare scorte basse
 *     responses:
 *       200:
 *         description: Lista di prodotti con scorte basse
 *       500:
 *         description: Errore del server
 */
router.get("/:company_id/low-stock", getLowStockProducts);

/**
 * @swagger
 * /companies/{company_id}/revenue:
 *   get:
 *     summary: Ottieni il totale delle vendite della compagnia
 *     tags: [Revenue]
 *     parameters:
 *       - in: path
 *         name: company_id
 *         required: true
 *         schema:
 *           type: integer
 *       - in: query
 *         name: start_date
 *         schema:
 *           type: string
 *           format: date
 *         description: Data di inizio del calcolo
 *       - in: query
 *         name: end_date
 *         schema:
 *           type: string
 *           format: date
 *         description: Data di fine del calcolo
 *     responses:
 *       200:
 *         description: Totale ricavi
 *       500:
 *         description: Errore del server
 */
router.get("/:company_id/revenue", getTotalRevenue);

export default router;