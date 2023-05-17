import { Router } from "express";
import userRouter from '../controllers/UserControllers';
import loginRouter from '../controllers/LoginController';
import emailRouter from '../controllers/EmailController'

const routers = Router();
routers.use('/api',
[ 
    userRouter, 
    loginRouter, 
    emailRouter
]);

export default routers;