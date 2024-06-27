import express from 'express';
import authRouter from '../src/controller/auth.controller.js';
import docRouter from '../src/controller/document.controller.js';
import cors from 'cors';
import dotenv from "dotenv";
import mongoose from 'mongoose';

dotenv.config();


const app = express();
app.use(express.json());
app.use(cors({
  credentials:true,
  origin: ['http://localhost:3000'],
  })
);

app.use('/api/doc', docRouter);
app.use('/api/user', authRouter);



mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to database!!");
  })
  .catch((err) => {
    console.log(err);
  });


const PORT = 5000;
app.listen(PORT,/*0.0.0.0"*/() =>{
    console.log('listening on port '+ PORT);
})