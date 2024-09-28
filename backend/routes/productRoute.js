import express from 'express';
import * as productController from '../controllers/productController.js';
import * as authMiddleWare from '../middlewares/authMiddleWare.js';

const router = express.Router();

router.post('/',authMiddleWare.authenticateToken, productController.createProduct);




export default router;