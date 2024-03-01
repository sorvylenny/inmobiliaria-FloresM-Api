// Archivo: controllers/direccionController.js

import Direccion from '../models/direccion.js';
import User from '../models/user.js'; // Importa el modelo de usuario

export const createAddress = async (req, res) => {
  const { title, description, address, department, city, latitude, longitude, bedrooms, bathrooms, price } = req.body;
  
  try {
    // Buscar el usuario por su nombre de usuario
    const user = await User.findOne({ username: req.user.username });

    // Verificar si se encontró el usuario
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Crear la dirección con el ID del usuario como createdBy
    const newAddress = new Direccion({
      title,
      description,
      address,
      department,
      city,
      latitude,
      longitude,
      bedrooms,
      bathrooms,
      price,
      createdBy: user.username
    });
console.log("title:", title, "description:", description, "address:", address, "department:", department, "city:", city, "latitude:", latitude, "longitude:", longitude, "usuario creacion:", user.username);
    // Guardar la dirección en la base de datos
    const addressSave = await newAddress.save();
    res.status(201).json(addressSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Función para obtener todas las direcciones
export const getAllAddresses = async (req, res) => {
  try {
    const direcciones = await Direccion.find();
    res.json(direcciones);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Función para obtener direcciones filtradas por título, departamento o ciudad
//TODO: Revisar
export const search = async (req, res) => {
  const { title, department, city } = req.query;
  const query = {};

 
  if (title) {
    query.title = { $regex: title, $options: 'i' };
  }
  if (department) {
    query.department = department;
  }
  if (city) {
    query.city = city;
  }

  try {
    const direccionesFiltradas = await Direccion.find(query);
    res.json(direccionesFiltradas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controlador para actualizar una dirección
export const updateAddress = async (req, res) => {
  Object.keys(req.body).forEach(key => {
      res.direccion[key] = req.body[key];
  });
  // Buscar el usuario por su nombre de usuario
    const user = await User.findOne({ username: req.user.username });

    // Verificar si se encontró el usuario
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
  res.direccion.updatedBy = req.user.username;
  console.log("usuario actualizo:", req.user.username, "updatedBy:", res.direccion.updatedBy);
  try {
      const updatedDireccion = await res.direccion.save();
      res.json(updatedDireccion);
  } catch (error) {
      res.status(400).json({ message: error.message });
  }
};

// Controlador para eliminar una dirección
export const deleteAddress = async (req, res) => {
const id = req.params.id
console.log("id:", id);
  try {
      await Direccion.deleteOne({_id : id});
      res.json({ message: 'Dirección eliminada correctamente' });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};
// Middleware para obtener una dirección por su ID
export const addressById = async (req, res, next) => {
  try {
      const direccion = await Direccion.findById(req.params.id);
      if (!direccion) {
          return res.status(404).json({ message: 'No se puede encontrar la dirección' });
      }
      res.direccion = direccion;
      next();
  } catch (error) {
      return res.status(500).json({ message: error.message });
  }
};

