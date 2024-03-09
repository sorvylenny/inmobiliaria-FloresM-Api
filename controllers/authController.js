import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import dotenv from 'dotenv';
dotenv.config();
export const register = async (req, res) => {
  const { username, fullname, password, roles } = req.body;

  try {
    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ username: { $regex : new RegExp("^" + username + "$", "i") } });
    if (existingUser) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    // Crear un nuevo usuario
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username: username.toLowerCase(), fullname: fullname.toUpperCase(),password: hashedPassword, roles, isActive: true });
    await newUser.save();
    const clean_response = {
      _id: newUser._id,
      username: newUser.username,
      fullname: newUser.fullname,
      roles: newUser.roles,
      isActive: newUser.isActive
          }
    // Generar el token JWT
    const token = jwt.sign({ userId: newUser._id, role: newUser.role }, 'secretKey', { expiresIn: '1h' });

    res.status(201).json({ message: 'Usuario creado exitosamente', user: clean_response, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const login = async (req, res) => {
  const { username, password } = req.body;
  console.log('username:', username, 'password:', password);
  
  try {
      // Verificar si el usuario existe
      const user = await User.findOne({ username: { $regex : new RegExp("^" + username + "$", "i") } });
      if (!user) {
          return res.status(401).json({ message: 'El nombre de usuario o la contraseña son incorrectos' });
      }

      // Verificar la contraseña
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
          return res.status(401).json({ message: 'El nombre de usuario o la contraseña son incorrectos' });
      }

      const singedUser = {
          id: user._id,
          username: user.username,
          roles: user.roles
      };

      // Generar token de autenticación
      const token = jwt.sign({ userId: user._id, username: user.username, roles: user.roles }, process.env.JWT_SECRET, { expiresIn: '1h' });
      console.log(token)
      res.status(200).json({ user: singedUser, token: token });
  } catch (error) {
      console.error("Error en el inicio de sesión:", error.message);
      res.status(500).json({ message: 'Ha ocurrido un error en el servidor' });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
  const clean_response = users.map(users => {
    return {
    _id: users._id,
    username: users.username,
    fullname: users.fullname,
    roles: users.roles,
    isActive: users.isActive
  }});
    res.status(200).json(clean_response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, fullname, password, roles, isActive } = req.body;

  try {
    // Verificar si el usuario existe
    const user = await User.findById({_id : id});
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Actualizar los campos del usuario
    if (username) user.username = username;
    if (fullname) user.fullname = fullname;
    if (password) user.password = password;
    if (roles) user.roles = roles;
    if (isActive) user.isActive = isActive;

    await user.save();
    const  clean_response={
      _id: user._id,
      username: user.username,
      fullname: user.fullname,
      roles: user.roles,
      isActive: user.isActive
    }
    res.status(200).json({ message: 'Usuario actualizado correctamente', user: clean_response });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};