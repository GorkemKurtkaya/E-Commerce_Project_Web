import express from 'express';
import * as orderController from '../controllers/orderController.js';
import * as authMiddleWare from '../middlewares/authMiddleWare.js';

const router = express.Router();

router.post('/products',authMiddleWare.authenticateToken, orderController.createProduct);
router.post('/purchaseProduct/:userid', orderController.purchaseProduct);



export default router;