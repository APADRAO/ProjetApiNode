import { Request, Response, Router, request, response } from "express";
import UserRepositorie  from '../repositories/UserRepositorie';

const userRouter = Router();


/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
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
userRouter.get('/users', async ( _req:Request, res:Response): Promise<Response>=>{
    console.log('INICIANDO GET ALL');
    const users = await UserRepositorie.getUsers();
    return res.status(200).json(users);
});

/**
 * @swagger
 * /api/users/by:
 *   get:
 *     summary: Get user by param
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
    const {  name, email, password } = request.body;
    console.log("NOME: ", name);
    const result = await UserRepositorie.postUser({ name, email, password })
    if(result instanceof Error){
        return response.status(400).json();
    }
    return response.json(result);
})

export default userRouter;