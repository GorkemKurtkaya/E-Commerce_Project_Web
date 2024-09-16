import express from 'express';
import * as userController from '../controllers/userController.js';
import * as authMiddleWare from '../middlewares/authMiddleWare.js';
import { purchaseProduct } from '../controllers/orderController.js';
import { checkUser } from '../middlewares/authMiddleWare.js';


const router = express.Router();

router.post('/register', userController.registerUser);



router.get('/checkUser', checkUser, (req, res) => {
    if (res.locals.user) {
        res.status(200).json({ user: res.locals.user });
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
});

router.post('/login', userController.loginUser);
router.route('/:id').get(userController.getAUser);
router.post('/:userid/purchase/:productid', purchaseProduct);

// router.get('/logout', userController.logoutUser);
// router.route('/dashboard').get(authMiddleWare.authenticateToken, userController.getDashboardPage);



export default router;