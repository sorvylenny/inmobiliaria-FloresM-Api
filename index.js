import express from "express";
import mongoose  from "mongoose";
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import direccionRoutes from './routes/direccionRoutes.js';
import authRoutes from './routes/authRoutes.js';
import cors from 'cors';

const app = express();
dotenv.config();
const mongoString= process.env.mongoDB;
const mongoDbUrl = "mongodb+srv://"+mongoString;
/* mongoose.set("strictQuery", false);
mongoose.set(mongoDbUrl,{ssl: true}); */

app.use(cors({
  origin: 'http://localhost:4200',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true // Si necesitas enviar cookies o autenticación
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/inmuebles', direccionRoutes);
app.use('/users', authRoutes);

app.listen(3000, () => {
    console.log("Server running on port 3000");
})

mongoose.connect(mongoDbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });
