import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const authenticateUser = (req, res, next) => {
    try {
        const token = req.headers.authorization;

        if (!token || !token.startsWith('Bearer ')) {
            throw new Error('Token de autenticación no proporcionado o en formato incorrecto');
        }

        const tokenWithoutBearer = token.slice(7);
        const decodedToken = jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET);

        req.user = decodedToken;
        console.log("User:", req.user);

        next();
    } catch (error) {
        console.error("Error de autenticación:", error.message);
        return res.status(401).json({ message: 'Token de autenticación inválido' });
    }
};

const authorize = (req, res, next) => {
    // Verificar si req.user está definido y si tiene la propiedad roles
    if (!req.user || !req.user.roles ) {
        return res.status(403).json({ message: 'Acceso no autorizado' });
    }

    // Permitir el acceso completo si el usuario es administrador
    if (req.user.roles.includes('admin')) {
        return next();
    }

    // Para los empleados, permitir acceso solo a rutas específicas de crear y editar
    if (req.user.roles.includes('empleado')) {
        console.log("Roles del empleado:", req.user.roles);
        console.log("Método de solicitud:", req.method);
        console.log("URL original:", req.originalUrl);

        // Verificar si la ruta es de creación, actualización o eliminación de inmuebles
        if (req.method === 'POST' && req.originalUrl === '/inmuebles/create') {
            console.log("Acceso permitido para crear");
            return next();
        }if (req.method === 'GET' && req.originalUrl === '/inmuebles/allOwner') {
            console.log("Acceso permitido para crear");
            return next();
        }if (req.method === 'POST' && req.originalUrl === '/users/login') {
            console.log("Acceso permitido para crear");
            return next();
        }
        if (req.method === 'PUT' && req.originalUrl.startsWith('/inmuebles/update')) {
            console.log("Acceso permitido para actualizar");
            return next();
        }

        // Si no es una ruta permitida, denegar acceso
        return res.status(403).json({ message: 'Acceso no autorizado para empleados' });
    }

    // Si el usuario no es ni administrador ni empleado, denegar el acceso
    return res.status(403).json({ message: 'Acceso no autorizado' });
};

export { authenticateUser, authorize };
