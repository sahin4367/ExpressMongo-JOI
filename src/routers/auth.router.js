import express from 'express';
import { authController } from '../controllers/auth.controller.js';

export const authRouter = express.Router();
const controller = authController
authRouter.post('/login' , controller.login );
authRouter.post('/register' , controller.register ) 


