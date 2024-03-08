import express from 'express';
import { register, login, getAllUsers, updateUser  } from '../controllers/authController.js';
import { authenticateUser, authorize } from '../middleware/authMiddleware.js'; // Ajusta la ruta a tu middleware de autenticación

const router = express.Router();

router.post('/login', login);

router.post('/register', authenticateUser, authorize, register);
router.get('/getAll', authenticateUser, authorize, getAllUsers);
router.put('/edit/:id', authenticateUser, authorize, updateUser);



export default router;
