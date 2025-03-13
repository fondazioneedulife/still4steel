import express from "express";
import { 
  createCompanySupply, getCompanySupplies, getCompanySupplyById, 
  updateCompanySupply, deleteCompanySupply 
} from "../controllers/companySupplyController.js";

const router = express.Router();

// Rotte per le associazioni tra aziende e forniture
router.get("/", getCompanySupplies);       // Ottieni tutte le associazioni
router.get("/:id", getCompanySupplyById);  // Ottieni un'associazione specifica per ID
router.post("/", createCompanySupply);     // Crea una nuova associazione
router.put("/:id", updateCompanySupply);   // Aggiorna un'associazione
router.delete("/:id", deleteCompanySupply); // Elimina un'associazione

export default router;
