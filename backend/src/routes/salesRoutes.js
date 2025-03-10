import express from "express";
import { 
  createSale, getSales, getSaleById, 
  updateSale, deleteSale 
} from "../controllers/salesController.js";

const router = express.Router();

// Rotte per la gestione delle vendite
router.get("/", getSales);         // Ottieni tutte le vendite
router.get("/:id", getSaleById);   // Ottieni una vendita specifica per ID
router.post("/", createSale);      // Crea una nuova vendita
router.put("/:id", updateSale);    // Aggiorna una vendita
router.delete("/:id", deleteSale); // Elimina una vendita

export default router;