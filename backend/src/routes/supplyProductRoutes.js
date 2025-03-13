import express from "express";
import {
    getAllSupplyProducts,
    getSupplyProductById,
    createSupplyProduct,
    updateSupplyProduct,
    deleteSupplyProduct
} from "../controllers/supplyProductController.js";

const router = express.Router();

// **Rotte API**
router.get("/", getAllSupplyProducts); // Ottieni tutte le associazioni
router.get("/:id", getSupplyProductById); // Ottieni un'associazione per ID
router.post("/", createSupplyProduct); // Crea una nuova associazione
router.put("/:id", updateSupplyProduct); // Modifica un'associazione esistente
router.delete("/:id", deleteSupplyProduct); // Elimina un'associazione

export default router;
