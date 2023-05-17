import { Router } from "express";
import userRouter from '../controllers/UserControllers';
import loginRouter from '../controllers/LoginController';

const routers = Router();
routers.use('/api',[ userRouter, loginRouter]);

export default routers;