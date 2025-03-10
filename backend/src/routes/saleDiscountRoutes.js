import express from "express";
import {
    getAllSaleDiscounts,
    getSaleDiscountById,
    createSaleDiscount,
    updateSaleDiscount,
    deleteSaleDiscount
} from "../controllers/saleDiscountController.js";

const router = express.Router();

// **Rotte API**
router.get("/", getAllSaleDiscounts); // Ottieni tutte le associazioni
router.get("/:id", getSaleDiscountById); // Ottieni un'associazione per ID
router.post("/", createSaleDiscount); // Crea una nuova associazione
router.put("/:id", updateSaleDiscount); // Modifica un'associazione
router.delete("/:id", deleteSaleDiscount); // Elimina un'associazione

export default router;