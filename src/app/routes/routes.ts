import { Router } from "express";
import userRouter from "../controllers/UserControllers";

const routers = Router();
routers.use('/api', userRouter);

export default routers;