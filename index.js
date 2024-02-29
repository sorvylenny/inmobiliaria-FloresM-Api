import express from "express";
import mongoose  from "mongoose";
import dotenv from 'dotenv'
dotenv.config()
import bodyParser from 'body-parser';
import direccionRoutes from './routes/direccionRoutes.js';
import authRoutes from './routes/authRoutes.js';

const app = express();
const mongoString= process.env.mongoDB;
const mongoDbUrl = "mongodb+srv://"+mongoString;
/* mongoose.set("strictQuery", false);
mongoose.set(mongoDbUrl,{ssl: true}); */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/direcciones', direccionRoutes);
app.use('/users', authRoutes);
app.listen(3000, () => {
    console.log("Server running on port 3000");
   
})

mongoose.connect(mongoDbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
    // Aquí puedes agregar cualquier otra configuración o inicialización necesaria antes de iniciar el servidor
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });
