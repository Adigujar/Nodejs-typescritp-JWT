import express from 'express';
import mongoose from 'mongoose';
import userRoutes  from './router'


const dotenv = require("dotenv");
const dbUrl = process.env.DB_URL || "mongodb://127.0.0.1:27017";




const app = express();
const port = 3000;
dotenv.config();

app.use(express.json())
mongoose.connect(dbUrl,{useNewUrlParser:true},()=> console.log('connected to db'))
app.use('/users', userRoutes);


app.listen(port,()=>console.log(port))