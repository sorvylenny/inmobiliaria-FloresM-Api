import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import dotenv from 'dotenv';
dotenv.config();
export const register = async (req, res) => {
  const { username, password, roles } = req.body;

  try {
    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    // Crear un nuevo usuario
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword, roles });
    await newUser.save();

    // Generar el token JWT
    const token = jwt.sign({ userId: newUser._id, role: newUser.role }, 'secretKey', { expiresIn: '1h' });

    res.status(201).json({ message: 'Usuario creado exitosamente', user: newUser, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const login = async (req, res) => {
  const { username, password } = req.body;
  console.log('username:', username, 'password:', password);
  try {
    // Verificar si el usuario existe
    const user = await User.findOne({ username: { $regex : new RegExp(username, "i") } });
    if (!user) {
      return res.status(401).json({ message: 'El nombre de usuario o la contraseña son incorrectos' });
    }

    // Verificar la contraseña
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'El nombre de usuario o la contraseña son incorrectos' }); 
    }

    // Generar token de autenticación
    const token = jwt.sign({ userId: user._id, username: user.username, roles: user.roles }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (error) {
    console.error("Error en el inicio de sesión:", error.message);
    res.status(500).json({ message: 'Ha ocurrido un error en el servidor' });
  }
};


