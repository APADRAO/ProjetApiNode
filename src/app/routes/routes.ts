import { Router } from "express";
import userRouter from "../controllers/UserControllers";

const routers = Router();
routers.use('/users', userRouter);

export default routers;