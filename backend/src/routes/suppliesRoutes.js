import express from "express";
import { 
  createSupply, getSupplies, getSupplyById, 
  updateSupply, deleteSupply 
} from "../controllers/suppliesController.js";

const router = express.Router();

// Rotte per le forniture (supplies)
router.get("/", getSupplies);       // Ottieni tutte le forniture
router.get("/:id", getSupplyById);  // Ottieni una fornitura specifica per ID
router.post("/", createSupply);     // Crea una nuova fornitura
router.put("/:id", updateSupply);   // Aggiorna una fornitura
router.delete("/:id", deleteSupply); // Elimina una fornitura

export default router;
