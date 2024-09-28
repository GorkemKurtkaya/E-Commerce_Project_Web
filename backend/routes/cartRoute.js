import express from 'express';
import * as cartController from '../controllers/cartController.js';
import * as authMiddleWare from '../middlewares/authMiddleWare.js';


const router = express.Router();

router.post("/",authMiddleWare.authenticateToken,cartController.createCart)
router.put("/:id",authMiddleWare.authenticateToken, cartController.putCart);
router.delete("/:id",authMiddleWare.authenticateToken, cartController.deleteCart);
router.get("/find/:userId",authMiddleWare.authenticateToken,cartController.getACart);
router.get("/",authMiddleWare.authenticateToken,cartController.getAllCart);



export default router;