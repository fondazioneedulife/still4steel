import express from "express";
import {
    getAllCompanySuppliers,
    getCompanySupplierById,
    createCompanySupplier,
    updateCompanySupplier,
    deleteCompanySupplier
} from "../controllers/companySupplierController.js";

const router = express.Router();

// **Rotte API**
router.get("/", getAllCompanySuppliers); // Ottieni tutte le associazioni
router.get("/:id", getCompanySupplierById); // Ottieni un'associazione per ID
router.post("/", createCompanySupplier); // Crea una nuova associazione
router.put("/:id", updateCompanySupplier); // Modifica un'associazione esistente
router.delete("/:id", deleteCompanySupplier); // Elimina un'associazione

export default router;
