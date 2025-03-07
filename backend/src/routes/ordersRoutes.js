import express from "express";
import { 
  createOrder, getOrders, getOrderById, 
  updateOrder, deleteOrder 
} from "../controllers/ordersController.js";

const router = express.Router();

// Rotte per la gestione degli ordini
router.get("/", getOrders);       // Ottieni tutti gli ordini
router.get("/:id", getOrderById);  // Ottieni un ordine specifico per ID
router.post("/", createOrder);     // Crea un nuovo ordine
router.put("/:id", updateOrder);   // Aggiorna un ordine
router.delete("/:id", deleteOrder); // Elimina un ordine

export default router;
