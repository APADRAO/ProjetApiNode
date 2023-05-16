import { Request, Response, Router, request, response } from "express";
import UserRepositorie  from '../repositories/UserRepositorie';
import jwt from "jsonwebtoken";
import login from '../repositories/LoginRepositorie';
import { Return } from '../entities/Return';
import { authenticateJWT } from '../../authMiddleware';
import moment from 'moment';

const SECRET_KEY = "abrakadabra";

const userRouter = Router();

userRouter.post("/login", async (req: Request, res: Response): Promise<Return> => {
    
    var ret = new Return();
    const { email, password } = req.body;
    if (await login(email, password)) {
        console.log(email); 
     var token = jwt.sign(
        {
          document: moment().format('DD/MM/YYYY'),
          user: email,
        },
        SECRET_KEY,
        {
          expiresIn: '1h',
        }
      );
      let stringRet = token.toString()
      console.log(stringRet);
      ret.status = true;    
      ret.message = 'Sucesso';
      ret.objeto = res.status(200).json(stringRet);
    } else {
        ret.status = true;
        ret.message = 'Sucesso';
        ret.objeto= res.status(401).json('Falha na autenticação');
    }
    return ret
});

userRouter.get('/users', authenticateJWT, async ( _req:Request, res:Response): Promise<Response>=>{
    console.log('INICIANDO GET ALL');
    const users = await UserRepositorie.getUsers();
    return res.status(200).json(users);
});

userRouter.get('/users/by', async (request:Request, response:Response): Promise<Response>=>{
    console.log('Iniciando Get com Parametros');

    const {param} = request.query
    const user = await UserRepositorie.getUserByParam({param}.param)
    if(user instanceof Error){
        return response.status(400).json();
    }
    return response.json(user);
})

userRouter.post('/users',async  ( request:Request, response:Response): Promise<Response>=>{
    var {  name, email, password } = request.body;
   
    console.log("NOME: ", name);
    const result = await UserRepositorie.postUser({ name, email, password })
    if(result instanceof Error){
        return response.status(400).json();
    }
    return response.json(result);
});
export default userRouter;