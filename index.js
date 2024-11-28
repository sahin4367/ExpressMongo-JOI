import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import { appRouter } from './src/routers/server.js';

dotenv.config();
const app = express(); 
app.use(express.json());


mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log('Connected to MongoDB!');
})
.catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
});

app.use('/api' ,appRouter)


const Port = process.env.PORT;

app.listen(Port , () => {
    console.log(`The server is runing ${Port}`);
})  