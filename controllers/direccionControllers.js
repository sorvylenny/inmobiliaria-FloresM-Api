// Archivo: controllers/direccionController.js

import Direccion from '../models/direccion.js';

// Función para crear una nueva dirección
export const createAddress = async (req, res) => {
  const { title, description, address, department, city, latitude, longitude } = req.body;
  const newAddress = new Direccion({ title, description, address, department, city, latitude, longitude });
  try {
    const addressSave = await newAddress.save();
    res.status(201).json(addressSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Función para obtener todas las direcciones
export const getAllAddresses = async (req, res) => {
  console.log('hola mundo de kathe')
  try {
    const direcciones = await Direccion.find();
    res.json(direcciones);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Función para obtener direcciones filtradas por título, departamento o ciudad
export const search = async (req, res) => {
  const { title, department, city } = req.query;
  const query = {};

  // Construir el objeto de consulta en base a los parámetros proporcionados
  if (title) {
    query.title = { $regex: title, $options: 'i' }; // Realizar búsqueda por título (ignorando mayúsculas y minúsculas)
  }
  if (department) {
    query.department = department; // Realizar búsqueda por departamento
  }
  if (city) {
    query.city = city; // Realizar búsqueda por ciudad
  }

  try {
    const direccionesFiltradas = await Direccion.find(query);
    res.json(direccionesFiltradas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Función para actualizar una dirección por su ID
export const updateAddress = async (req, res) => {
  if (req.body.title != null) {
    res.direccion.title = req.body.title;
  }
  if (req.body.description != null) {
    res.direccion.description = req.body.description;
  }
  if(req.body.address != null) {
    res.direccion.address = req.body.address;
  }
  if(req.body.department != null) {
    res.direccion.department = req.body.department;
  }
  if(req.body.city != null) {
    res.direccion.city = req.body.city;
  }
  if(req.body.latitude != null) {
    res.direccion.latitude = req.body.latitude;
  }
  if(req.body.longitude != null) {
    res.direccion.longitude = req.body.longitude;
  }

  try {
    const direccionActualizada = await res.direccion.save();
    res.json(direccionActualizada);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Función para eliminar una dirección por su ID
export const deleteAddress = async (req, res) => {
  try {
    await res.direccion.remove();
    res.json({ message: 'Dirección eliminada' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Middleware para obtener una dirección por su ID
export const addressById = async (req, res, next) => {
  let direccion;
  try {
    direccion = await Direccion.findById(req.params.id);
    if (direccion == null) {
      return res.status(404).json({ message: 'No se puede encontrar la dirección' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  res.direccion = direccion;
  next();
};
