import express from "express";
import { 
  createCompany, getCompanies, getCompanyById, 
  updateCompany, deleteCompany 
} from "../controllers/companyController.js";
import { authenticateUser, validateCompanyData } from "../middlewares/middleware.js";

const router = express.Router();

router.get("/", getCompanies);
router.get("/:id", authenticateUser, getCompanyById);
router.post("/", authenticateUser, validateCompanyData, createCompany);
router.put("/:id", authenticateUser, updateCompany);
router.delete("/:id", authenticateUser, deleteCompany);

export default router;