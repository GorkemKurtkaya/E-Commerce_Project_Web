import express from 'express';
import * as userController from '../controllers/userController.js';
import * as authMiddleWare from '../middlewares/authMiddleWare.js';
import { purchaseProduct } from '../controllers/orderController.js';


const router = express.Router();

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.route('/:id').get(userController.getAUser);
router.post('/:userid/purchase/:productid', purchaseProduct);

// router.get('/logout', userController.logoutUser);
// router.route('/dashboard').get(authMiddleWare.authenticateToken, userController.getDashboardPage);



export default router;