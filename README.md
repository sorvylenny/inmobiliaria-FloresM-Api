# InmobiliariaFloresM API

Este proyecto es el backend para "inmobiliariaFloresM", una aplicación web diseñada para gestionar propiedades inmobiliarias. Permite la creación, edición y eliminación de inmuebles, así como la gestión de usuarios administrativos y propietarios de los inmuebles. Incluye un dashboard para visualizar las ciudades y departamentos con mayor cantidad de inmuebles disponibles.

## Funcionalidades Principales

- **Gestión de Inmuebles**: Permite crear, editar y eliminar inmuebles.
- **Gestión de Usuarios de la Empresa**: Permite crear, editar e inactivar cuentas de usuario para empleados de la inmobiliaria.
- **Gestión de Propietarios**: Facilita la creación y gestión de propietarios de los inmuebles.
- **Dashboard**: Muestra las 5 ciudades y departamentos con mayor cantidad de inmuebles en la inmobiliaria.

## Tecnologías y Dependencias

Este backend se ha desarrollado utilizando Node.js y Express, con una base de datos MongoDB a través de Mongoose para la gestión de datos. La autenticación de usuarios se maneja con Passport.js.

### Dependencias Principales

- `bcrypt`: Para hashing de contraseñas.
- `cors`: Para habilitar CORS.
- `dotenv`: Para manejar variables de entorno.
- `express`: Framework de Node.js para construir la aplicación.
- `jsonwebtoken`: Para la gestión de tokens JWT.
- `mongoose`: Para la interacción con MongoDB.
- `passport` y `passport-local`: Para la autenticación.

### Dependencias de Desarrollo

- `nodemon`: Para el reinicio automático del servidor durante el desarrollo.

## Cómo Empezar

Para poner en marcha el proyecto localmente, sigue estos pasos:

1. Clona este repositorio: `[git clone <URL_del_repositorio>](https://github.com/sorvylenny/inmobiliaria-FloresM-Api)`
2. Instala las dependencias: `npm install`
3. Configura las variables de entorno según necesites en un archivo `.env`.
4. Inicia el servidor en modo desarrollo con `npm run dev` o en producción con `npm start`.
5. Asegúrate de tener MongoDB corriendo en tu sistema o configurar un cluster remoto en tu archivo `.env`.
6. El backend está implementado en ExpressJS y se encuentra disponible en el siguiente enlace:(https://inmobiliaria-flores-m-api.vercel.app). Despues del app/inmuebles  y tambien esta /users  el de users solo le da permiso de ver a los usuarios admin. Los publicos son (https://inmobiliaria-flores-m-api.vercel.app/inmuebles/getAll) y (https://inmobiliaria-flores-m-api.vercel.app/inmuebles/seemore/id)

## Servidor de Desarrollo

Ejecuta `npm run dev` para iniciar el servidor en modo desarrollo. El servidor se reiniciará automáticamente al realizar cambios en el código.

## Compilación y Producción

Ejecuta `npm start` para correr el servidor en modo producción.

## Autor

Este proyecto fue desarrollado por Katherine Flores. Puedes contactarme en <floresmKatherine@gmail.com> para más información.
