import { IsNull } from 'typeorm';
import { IReturn } from './../interfaces/IReturn';
import { ILogin } from './../interfaces/ILogin';
import { Request, Response, Router, request, response } from "express";
import UserRepositorie  from '../repositories/UserRepositorie';
import jwt from "jsonwebtoken";
import login from '../repositories/LoginRepositorie';
import { Return } from '../entities/Return';
import { authenticateJWT } from '../../authMiddleware';

const SECRET_KEY = "abrakadabra";

const userRouter = Router();

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Gera JWT
 *     tags:
 *       - Autentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login'
 *     responses:
 *       '200':
 *         description: string JWT 
 *         
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Internal server error
 */
userRouter.post("/login", async (req: Request, res: Response): Promise<Return> => {
    // Aqui você pode implementar a lógica de autenticação
    // Verifique as credenciais e, se forem válidas, gere um token JWT
    var ret = new Return();
    const { email, password } = req.body;
    console.log({ email, password })
    if (await login(email, password)) {
        console.log(email); 
      var token = jwt.sign( '1' , SECRET_KEY);
      //console.log(token); 
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

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
userRouter.get('/users', authenticateJWT, async ( _req:Request, res:Response): Promise<Response>=>{
    console.log('INICIANDO GET ALL');
    const users = await UserRepositorie.getUsers();
    return res.status(200).json(users);
});

/**
 * @swagger
 * /api/users/by:
 *   get:
 *     summary: Get user by param
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:  
 *       - in: query
 *         name: param
 *         required: true
 *         schema:
 *           type: string
 *         description: busca por nome, email ou password
 *     responses:
 *       '200':
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/User'
 */
userRouter.get('/users/by', async (request:Request, response:Response): Promise<Response>=>{
    console.log('Iniciando Get com Parametros');

    const {param} = request.query
    const user = await UserRepositorie.getUserByParam({param}.param)
    if(user instanceof Error){
        return response.status(400).json();
    }
    return response.json(user);
})

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create a new user
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       '201':
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Internal server error
 */
userRouter.post('/users',async  ( request:Request, response:Response): Promise<Response>=>{
    var {  name, email, password } = request.body;
   
    //password = encrypt(password);
    console.log("NOME: ", name);
    const result = await UserRepositorie.postUser({ name, email, password })
    if(result instanceof Error){
        return response.status(400).json();
    }
    return response.json(result);
});




export default userRouter;