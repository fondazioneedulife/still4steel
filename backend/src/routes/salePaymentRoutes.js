import express from "express";
import { 
  createSalePayment, getSalePayments, getSalePaymentById, 
  updateSalePayment, deleteSalePayment 
} from "../controllers/salePaymentController.js";

const router = express.Router();

// Rotte per la gestione delle transazioni di pagamento
router.get("/", getSalePayments);            // Ottieni tutte le transazioni di pagamento
router.get("/:id", getSalePaymentById);      // Ottieni una transazione di pagamento specifica per ID
router.post("/", createSalePayment);         // Crea una nuova transazione di pagamento
router.put("/:id", updateSalePayment);       // Aggiorna una transazione di pagamento
router.delete("/:id", deleteSalePayment);    // Elimina una transazione di pagamento

export default router;