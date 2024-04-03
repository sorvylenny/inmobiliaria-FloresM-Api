import express from "express";
import mongoose  from "mongoose";
import dotenv from 'dotenv';
import direccionRoutes from './routes/direccionRoutes.js';
import authRoutes from './routes/authRoutes.js';
import cors from 'cors';

const app = express();
dotenv.config();
const mongoString= process.env.mongoDB;
const mongoDbUrl = "mongodb+srv://"+ mongoString;/* 
mongoose.set("strictQuery", false);
mongoose.set(mongoDbUrl,{ssl: true}); */

const whitelist = [''];
const corsOptions = {
  origin: function (origin, callback) {

    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true 
};


app.use(cors({corsOptions}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/inmuebles', direccionRoutes);
app.use('/users', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

mongoose.connect(mongoDbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });
