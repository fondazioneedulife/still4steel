import express from "express";
import {
    getAllOrderDetails,
    getOrderDetailById,
    createOrderDetail,
    updateOrderDetail,
    deleteOrderDetail
} from "../controllers/orderDetailsController.js";

const router = express.Router();

// **Rotte API**
router.get("/", getAllOrderDetails); // Ottieni tutti i dettagli ordine
router.get("/:id", getOrderDetailById); // Ottieni un dettaglio ordine per ID
router.post("/", createOrderDetail); // Crea un nuovo dettaglio ordine
router.put("/:id", updateOrderDetail); // Modifica un dettaglio ordine esistente
router.delete("/:id", deleteOrderDetail); // Elimina un dettaglio ordine

export default router;
