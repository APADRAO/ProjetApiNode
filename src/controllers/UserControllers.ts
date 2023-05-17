import { Request, Response, Router, request, response } from "express";
import UserRepositorie  from '../app/User/repositories/UserRepositorie';
import { authenticateJWT } from '../authMiddleware';

//const SECRET_KEY = "abrakadabra";

const userRouter = Router();


userRouter.get('/users', authenticateJWT, async ( _req:Request, res:Response): Promise<Response>=>{
    console.log('INICIANDO GET ALL');
    const users = await UserRepositorie.getUsers();
    return res.status(200).json(users);
});

userRouter.get('/users/by', authenticateJWT, async (request:Request, response:Response): Promise<Response>=>{
    console.log('Iniciando Get com Parametros');

    const {param} = request.query
    const user = await UserRepositorie.getUserByParam({param}.param)
    if(user instanceof Error){
        return response.status(400).json();
    }
    return response.json(user);
})

userRouter.post('/users', authenticateJWT, async ( request:Request, response:Response): Promise<Response>=>{
    var {  name, email, password } = request.body;
   
    console.log("NOME: ", name);
    const result = await UserRepositorie.postUser({ name, email, password })
    if(result instanceof Error){
        return response.status(400).json();
    }
    return response.json(result);
});
export default userRouter;