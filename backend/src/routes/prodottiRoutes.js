import express from "express";
import { 
    getAllProdotti, 
    getProdottoById, 
    createProdotto, 
    updateProdotto, 
    deleteProdotto 
} from "../controllers/prodottiController.js";
const router = express.Router();

// Get all products
router.get('/', getAllProdotti);

// Get a single product by ID
router.get('/:id', getProdottoById);

// Create a new product
router.post('/', createProdotto);

// Update a product by ID
router.put('/:id', updateProdotto);

// Delete a product by ID
router.delete('/:id', deleteProdotto);

export default router;