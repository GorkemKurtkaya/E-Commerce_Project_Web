import express from 'express';
import * as userController from '../controllers/userController.js';
import * as authMiddleWare from '../middlewares/authMiddleWare.js';


const router = express.Router();

router.post('/register', userController.registerUser);




export default router;