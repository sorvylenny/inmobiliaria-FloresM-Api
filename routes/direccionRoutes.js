import express from 'express';
const router = express.Router();
import { createAddress, getAllAddresses, search, updateAddress, deleteAddress, addressById } from '../controllers/direccionControllers.js';
import { authenticateUser, authorize } from '../middleware/authMiddleware.js'; // Cambia la extensión a .mjs

// Rutas accesibles para todos
router.get('/getAll', getAllAddresses);
router.get('/search', search);

router.use(authenticateUser);

router.post('/create', authorize,createAddress);
router.put('/update/:id', authorize, addressById, updateAddress);
router.delete('/delete/:id', authorize, deleteAddress);


export default router;
