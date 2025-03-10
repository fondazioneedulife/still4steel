// routes/supplierRoutes.js
import express from "express";
import { 
  createSupplier, getSuppliers, getSupplierById, 
  updateSupplier, deleteSupplier 
} from "../controllers/suppliersController.js";

const router = express.Router();

router.get("/", getSuppliers);
router.get("/:id", getSupplierById);
router.post("/", createSupplier);
router.put("/:id", updateSupplier);
router.delete("/:id", deleteSupplier);

export default router;