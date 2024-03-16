import express from 'express';
import { register, login, getAllUsers, updateUser, userById  } from '../controllers/authController.js';
import { authenticateUser, authorize } from '../middleware/authMiddleware.js'; 

const router = express.Router();

router.post('/login',/*  authorize, */ login);

router.post('/register', authenticateUser, authorize, register);
router.get('/getAll', authenticateUser, authorize, getAllUsers);
router.put('/edit/:id', authenticateUser, authorize, updateUser);
router.get('/user/:id', authenticateUser, authorize, userById);



export default router;
