
import { Request, Response, Router } from "express";
import { authenticateJWT } from "../authMiddleware";
import TarefaRepositorie  from '../app/Tarefa/repositories/TarefaRepositories';
import { format } from "path";
import { ITarefa } from "../app/Tarefa/Interfaces/ITarefa";

const tarefaRouter = Router();


tarefaRouter.get('/tarefa',  authenticateJWT, async ( _req:Request, res:Response): Promise<Response>=>{
    
    const tar = await TarefaRepositorie.getTarefas();
    console.log('INICIANDO GET ALL');
    if(tar){
    return res.status(200).json(tar);
    }else{
        return res.status(200).json([])
    }
});
tarefaRouter.get('/tarefa/byIdTarefa', authenticateJWT, async (request:Request, response:Response): Promise<Response>=>{
    console.log('Iniciando Get com Parametros');

    const {idTar} = await request.query
    const tar = await TarefaRepositorie.getTarefasByParam({idTar}.idTar)
    if(tar instanceof Error){
        return response.status(400).json();
    }
    return response.json(tar);
});
tarefaRouter.get('/tarefa/ByNome', authenticateJWT, async (request:Request, response:Response): Promise<Response>=>{
    console.log('Iniciando Get com Parametros');

    const {nmTar} = await request.query
    const tar = await TarefaRepositorie.getTarefasByParam(null,null,{nmTar}.nmTar)
    if(tar instanceof Error){
        return response.status(400).json();
    }
    return response.json(tar);
});
tarefaRouter.get('/tarefa/ByidUsuario', authenticateJWT, async (request:Request, response:Response): Promise<Response>=>{
    console.log('Iniciando Get com Parametros');

    const {idusr} = await request.query
    const tar = await TarefaRepositorie.getTarefasByParam(null,{idusr}.idusr)
    if(tar instanceof Error){
        return response.status(400).json();
    }
    return response.json(tar);
});
tarefaRouter.get('/tarefa/dtTarefa', authenticateJWT, async (request:Request, response:Response): Promise<Response>=>{
    console.log('Iniciando Get com Parametros');

    const {dtStart,dtEnd} = await request.query
    const tar = await TarefaRepositorie.getTarefasByParam(null,null,null,{dtStart,dtEnd}.dtStart, {dtStart,dtEnd}.dtEnd)
    if(tar instanceof Error){
        return response.status(400).json();
    }
    return response.json(tar);
});
tarefaRouter.get('/tarefa/weekUsaer', authenticateJWT, async (request:Request, response:Response): Promise<Response>=>{
    console.log('Iniciando Get com Parametros');

    const {idusuario,nrsemana} = await request.query
    const tar = await TarefaRepositorie.getTarefasByParam(null,{idusuario,nrsemana}.idusuario,null,null, null,{idusuario,nrsemana}.nrsemana)
    if(tar instanceof Error){
        return response.status(400).json();
    }
    return response.json(tar);
});
tarefaRouter.post('/tarefa',  async ( request:Request, response:Response): Promise<Response>=>{
    var tarefa:ITarefa = request.body;
   
    console.log("tarefa: ", JSON.stringify(tarefa));
    const result = await TarefaRepositorie.postTarefa(tarefa)
    if(result instanceof Error){
        return response.status(400).json();
    }
    return response.json(result);
});
export default tarefaRouter