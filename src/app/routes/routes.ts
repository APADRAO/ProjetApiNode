import { Router } from "express";
import userRouter from '../User/controllers/UserControllers';
import loginRouter from '../Login/controllers/LoginController';

const routers = Router();
routers.use('/api',[ userRouter, loginRouter]);

export default routers;