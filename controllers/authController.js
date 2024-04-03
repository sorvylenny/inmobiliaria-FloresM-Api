import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import dotenv from 'dotenv';
dotenv.config();
export const register = async (req, res) => {
  const { username, fullname, document, email, phoneNumber, password, roles } = req.body;

  try {
    
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, fullname, document, email, phoneNumber, password: hashedPassword, roles, isActive: true });
    await newUser.save();
    
    const token = jwt.sign({ userId: newUser._id, role: newUser.role }, 'secretKey', { /* expiresIn: '1h' */ });

    res.status(201).json({ message: 'Usuario creado exitosamente', user: newUser, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
      // Verificar si el usuario existe
      const user = await User.findOne({ username: { $regex : new RegExp(username, "i") } });
      if (!user) {
          return res.status(401).json({ message: 'El nombre de usuario o la contraseña son incorrectos' });
      }
      if(user.isActive === false){
        return res.status(403).json({ message: 'El usuario no se encuentra activo' });
      }
      // Verificar la contraseña
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
          return res.status(401).json({ message: 'El nombre de usuario o la contraseña son incorrectos' });
      }

      const singedUser = {
          id: user._id,
          username: user.username,
          roles: user.roles,
          isActive: user.isActive
      };

      // Generar token de autenticación
      const token = jwt.sign({ userId: user._id, username: user.username, roles: user.roles }, process.env.JWT_SECRET, { expiresIn: '1h' });
      
      res.status(200).json({ user: singedUser, token: token });
  } catch (error) {
      console.error("Error en el inicio de sesión:", error.message);
      res.status(500).json({ message: 'Ha ocurrido un error en el servidor' });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    const cleanUsers = users.map(user => ({
      _id: user._id,
      username: user.username,
      fullname: user.fullname,
      document: user.document,
      email: user.email,
      phoneNumber: user.phoneNumber,
      roles: user.roles,
      isActive: user.isActive
    }));
    res.status(200).json(cleanUsers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, fullname, document, email, phoneNumber, roles, isActive } = req.body;

  try {
    // Verificar si el usuario existe
    const user = await User.findById({_id : id});
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Actualizar los campos del usuario
    if (username) user.username = username;
    if (fullname) user.fullname = fullname;
    if (document !== undefined) user.document = document;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (roles !== undefined) user.roles = roles;
    if (isActive !== undefined) user.isActive = isActive;
    await user.save();

    res.status(200).json({ message: 'Usuario actualizado correctamente', user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const userById = async(req, res)=>{
  const { id } = req.params;
  try{
    const user = await User.findById({_id:id});
    if(!user){
      return res.status(404).json({message:'No se encontro el usuario'});
    }
    res.json(user);
  } catch(error){
    return res.status(500).json({message: error.message});
  }
};