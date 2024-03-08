// Archivo: controllers/direccionController.js

import Direccion from '../models/direccion.js';
import User from '../models/user.js';

export const createAddress = async (req, res) => {
  const { title, description, address, department, city, latitude, longitude, bedrooms, bathrooms,closet, price } = req.body;
  
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
      closet,
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
  const { title, department, city, price } = req.query;
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
  if (price) {
    query.price = price;
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
  try {
    const id = req.params.id; // Obtén el ID de los parámetros de la ruta

    // Busca la dirección por su ID
    const direccion = await Direccion.findById({_id: id});

    // Verifica si se encontró la dirección
    if (!direccion) {
      return res.status(404).json({ message: 'Dirección no encontrada' });
    }

    // Actualiza cada campo con lo que se haya enviado en el cuerpo de la petición
    Object.keys(req.body).forEach(key => {
      direccion[key] = req.body[key];
    });

    // Busca el usuario por su nombre de usuario
    const user = await User.findOne({ username: req.user.username });

    // Verifica si se encontró el usuario
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Actualiza el campo 'updatedBy' con el nombre de usuario del usuario actual
    direccion.updatedBy = req.user.username;

    // Guarda la dirección actualizada en la base de datos
    const updatedDireccion = await direccion.save();
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
// obtener una dirección por su ID
export const addressById = async (req, res) => {
  const id = req.params.id
  try {
      const direccion = await Direccion.findById({_id: id});
      if (!direccion) {
          return res.status(404).json({ message: 'No se puede encontrar la dirección' });
      }
      res.json(direccion);
      
  } catch (error) {
      return res.status(500).json({ message: error.message });
  }
};

