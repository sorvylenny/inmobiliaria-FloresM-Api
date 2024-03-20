import express from 'express';
const router = express.Router();
import { createAddress, getAllAddresses, search, saveOwnerDetails, updateAddress, deleteAddress, addressById, getAllOwners, getDepartmentsMoreRegistered, getCitiesMoreRegistered } from '../controllers/direccionControllers.js';
import { authenticateUser, authorize } from '../middleware/authMiddleware.js'; // Cambia la extensión a .mjs

// Rutas accesibles para todos
router.get('/getAll', getAllAddresses);
router.get('/search', search);
router.get('/seemore/:id', addressById);


router.use(authenticateUser);
router.get('/allOwner', authorize, getAllOwners);
router.post('/creatOwner', authorize, saveOwnerDetails);
router.post('/create', authorize,createAddress);
router.put('/update/:id', authorize, updateAddress);
router.delete('/delete/:id', authorize, deleteAddress);
router.get('/departmentMoreRegistered', authorize, getDepartmentsMoreRegistered );
router.get('/cityMoreRegistered', authorize, getCitiesMoreRegistered );

export default router;
