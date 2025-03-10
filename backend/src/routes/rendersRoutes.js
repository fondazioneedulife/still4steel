import express from "express";
import { 
  createRender, getRenders, getRenderById, 
  updateRender, deleteRender 
} from "../controllers/rendersController.js";

const router = express.Router();

// Rotte per la gestione dei renders
router.get("/", getRenders);         // Ottieni tutti i renders
router.get("/:id", getRenderById);   // Ottieni un render specifico per ID
router.post("/", createRender);      // Crea un nuovo render
router.put("/:id", updateRender);    // Aggiorna un render
router.delete("/:id", deleteRender); // Elimina un render

export default router;