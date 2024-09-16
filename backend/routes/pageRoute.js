import express from 'express';
import * as pageController from '../controllers/pageController.js';
import * as authMiddleWare from '../middlewares/authMiddleWare.js';

const router = express.Router();

router.route('/').get(authMiddleWare.authenticateToken, pageController.getIndexPage);
router.route('/signup').get(pageController.getRegisterPage);
router.route('/login').get(pageController.getLoginPage);
router.route('/logout').get(pageController.getLogout);

export default router;