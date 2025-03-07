import express from "express";
import {
    getAllInvoices,
    getInvoiceById,
    createInvoice,
    updateInvoice,
    deleteInvoice
} from "../controllers/invoiceController.js";

const router = express.Router();

// **Rotte API**
router.get("/", getAllInvoices); // Ottieni tutte le fatture
router.get("/:id", getInvoiceById); // Ottieni una fattura per ID
router.post("/", createInvoice); // Crea una nuova fattura
router.put("/:id", updateInvoice); // Modifica una fattura esistente
router.delete("/:id", deleteInvoice); // Elimina una fattura

export default router;
