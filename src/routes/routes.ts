import { Router } from "express";
import userRouter from '../controllers/UserControllers';
import loginRouter from '../controllers/LoginController';
import emailRouter from '../controllers/EmailController';
import tarefaRouter from '../controllers/TarefaController'
import tpTarefaRouter from "../controllers/TipoTarefaControllers";

const routers = Router();
routers.use('/api',
[ 
    userRouter, 
    loginRouter, 
    emailRouter,
    tarefaRouter,
    tpTarefaRouter
]);

export default routers;