import express from "express";
import {
    getAllPayments,
    getPaymentById,
    createPayment,
    updatePayment,
    deletePayment
} from "../controllers/paymentsController.js";

const router = express.Router();

// **Rotte API**
router.get("/", getAllPayments); // Ottieni tutti i pagamenti
router.get("/:id", getPaymentById); // Ottieni un pagamento per ID
router.post("/", createPayment); // Crea un nuovo pagamento
router.put("/:id", updatePayment); // Modifica un pagamento esistente
router.delete("/:id", deletePayment); // Elimina un pagamento

export default router;
