import { Router } from "express";
import userRouter from '../controllers/UserControllers';
import loginRouter from '../controllers/LoginController';
import emailRouter from '../controllers/EmailController';
import tarefaRouter from '../controllers/TarefaController'

const routers = Router();
routers.use('/api',
[ 
    userRouter, 
    loginRouter, 
    emailRouter,
    tarefaRouter
]);

export default routers;