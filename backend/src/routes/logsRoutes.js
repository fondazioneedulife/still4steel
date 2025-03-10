import express from "express";
import {
    getAllLogs,
    getLogById,
    createLog,
    deleteLog
} from "../controllers/logsController.js";

const router = express.Router();

// **Rotte API**
router.get("/", getAllLogs); // Ottieni tutti i log
router.get("/:id", getLogById); // Ottieni un log per ID
router.post("/", createLog); // Crea un nuovo log
router.delete("/:id", deleteLog); // Elimina un log

export default router;