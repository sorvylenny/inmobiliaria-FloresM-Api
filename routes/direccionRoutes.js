import express from 'express';
const router = express.Router();
import { createAddress, getAllAddresses,search,updateAddress,deleteAddress,addressById } from '../controllers/direccionControllers.js';

const authorizeEmployee = (req, res, next) => {
    if (req.user.role !== 'empleado') {
      return res.status(403).json({ message: 'Acceso no autorizado para empleados' });
    }
    next();
  };

  // Middleware de autorización para administradores
  const authorizeAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Acceso no autorizado para administradores' });
    }
    next();
  };


router.post('/create', authorizeAdmin, authorizeEmployee, createAddress); // Crear una nueva dirección
router.get('/getAll', getAllAddresses); // Obtener todas las direcciones
router.get('/search', search); // Obtener direcciones filtradas por título, departamento o ciudad
router.put('/:id', authorizeAdmin, authorizeEmployee, addressById, updateAddress); // Actualizar una dirección por su ID
router.delete('/:id', authorizeAdmin, addressById, deleteAddress); // Eliminar una dirección por su ID

export default router;