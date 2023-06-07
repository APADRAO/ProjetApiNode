import { Request, Response, Router, request, response } from "express";
import TpTarefaRepositorie  from '../app/TipoTarefa/Repositories/tipoTarefaRepositorie';
import { authenticateJWT } from '../authMiddleware';


const tpTarefaRouter = Router();


tpTarefaRouter.get('/tpTarefa', authenticateJWT, async ( _req:Request, res:Response): Promise<Response>=>{
    console.log('INICIANDO GET ALL');
    const users = await TpTarefaRepositorie.get();
    return res.status(200).json(users);
});

tpTarefaRouter.get('/tpTarefa/by', authenticateJWT, async (request:Request, response:Response): Promise<Response>=>{
    console.log('Iniciando Get com Parametros');

    const {param} = request.query
    const user = await TpTarefaRepositorie.getByParam({param}.param)
    if(user instanceof Error){
        return response.status(400).json();
    }
    return response.json(user);
});


tpTarefaRouter.post('/tpTarefa', authenticateJWT, async ( request:Request, response:Response): Promise<Response>=>{
    var {  nametar, idtar } = request.body;
   
    console.log("NOME: ", nametar);
    const result = await TpTarefaRepositorie.post({  nametar, idtar })
    if(result instanceof Error){
        return response.status(400).json();
    }
    return response.json(result);
});
export default tpTarefaRouter;