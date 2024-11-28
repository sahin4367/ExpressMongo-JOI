import express from 'express' ;
import { authRouter } from './auth.router.js';


export const appRouter = express.Router();

appRouter.use('/auth' , authRouter);