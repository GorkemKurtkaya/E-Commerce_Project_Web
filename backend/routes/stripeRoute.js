import express from 'express';
import * as stripeController from '../controllers/stripeController.js';
import * as authMiddleWare from '../middlewares/authMiddleWare.js';


const router = express.Router();

router.post("/payment",authMiddleWare.authenticateToken,stripeController.payment)




export default router;