import express from 'express';
import * as orderController from '../controllers/orderController.js';

const router = express.Router();

router.post('/products', orderController.createProduct);
// router.post('/:id/purchase/:productid', orderController.purchaseProduct);



export default router;