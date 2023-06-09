import { ITarefa } from '../Interfaces/ITarefa';
import { AppDataSource } from "../../../database/data-source";
import {Tarefa} from '../../../database/entities/Tarefas'
import DateParser from '../../Extensions/DateFunction';
import { User } from '../../../database/entities/User';

const dateParser = new DateParser("yyyy-MM-dd");
const tarefasRepository = AppDataSource.getRepository(Tarefa);
const userRepository = AppDataSource.getRepository(Tarefa);

const getTarefas= async (): Promise<Tarefa[]> =>{
    var ret = await tarefasRepository.find();
    console.log(ret);
    if(ret){
        return ret
    }
    return [];
} 

const getTarefasByParam = async (idTarefa?:any, idUsuario?:any, nmTarefa?:any, dt1?:any, dt2?:any, semana?:any, idtipotarefa?:any): Promise<Tarefa[]|Error> =>{
   
        if(idTarefa){
        return await tarefasRepository.find({
            where:{
                idTarefa:parseInt(idTarefa)
            }
        });
       }
       if(idUsuario&&!semana&&!idtipotarefa){
        var ret = await tarefasRepository
        .createQueryBuilder('tarefa')
        .innerJoinAndSelect('tarefa.user', 'User')
        .where("tarefa.idUsuario = :idUsuario", { idUsuario })
        .getMany()
        // = await (await query.getRawAndEntities()).entities.find()
        console.log(ret)
        return ret;
       }
       if(nmTarefa){
        return await tarefasRepository.find({
            where:{ 
                nmTarefa:nmTarefa.toString()
            }
        });
       }
       if(dt1!=null&&dt2!=null){
console.log(`dts : ${dt1} e ${dt2}`)
        var startDate  = dateParser.parseDate(dt1);
        var endDate  = dateParser.parseDate(dt2);
        console.log(startDate)
        console.log(endDate)
        var ret = await tarefasRepository
        .createQueryBuilder('tarefa')
        .innerJoinAndSelect('tarefa.user', 'User')
        .where("tarefa.dtTarefa >= :startDate", { startDate })
        .andWhere("tarefa.dtTarefa <= :endDate", { endDate })
        .getMany()
        // = await (await query.getRawAndEntities()).entities.find()
        console.log(ret)
        return ret;
       }
       if(semana!=null && idUsuario==0 && idtipotarefa==0){
        //console.log(semana,idUsuario)
        return await tarefasRepository
        .createQueryBuilder('tarefa')
        .innerJoinAndSelect('tarefa.user', 'User')
        .innerJoinAndSelect('tarefa.tipoTarefa', 'TipoTarefa')
        .where("WEEK(tarefa.dtTarefa) = :semana", { semana })
        .getMany();
        
       }
       if(semana!=null && idUsuario!=null && idtipotarefa==0){
        //console.log(semana,idUsuario)
        return await tarefasRepository
        .createQueryBuilder('tarefa')
        .innerJoinAndSelect('tarefa.user', 'User')
        .innerJoinAndSelect('tarefa.tipoTarefa', 'TipoTarefa')
        .where("WEEK(tarefa.dtTarefa) = :semana", { semana })
        .andWhere("tarefa.idusuario = :idUsuario", { idUsuario })
        .getMany();
        
       }
       if(semana!=null && idUsuario==0 && idtipotarefa!=null){
        //console.log(semana,idUsuario)
        return await tarefasRepository
        .createQueryBuilder('tarefa')
        .innerJoinAndSelect('tarefa.user', 'User')
        .innerJoinAndSelect('tarefa.tipoTarefa', 'TipoTarefa')
        .where("WEEK(tarefa.dtTarefa) = :semana", { semana })
        .andWhere("tarefa.idtipotarefa = :idtipotarefa", { idtipotarefa })
        .getMany();
        
       }
       if(semana!=null && idUsuario!=null && idtipotarefa!=null){
        //console.log(idtipotarefa)
        return await tarefasRepository
        .createQueryBuilder('tarefa')
        .innerJoinAndSelect('tarefa.user', 'User')
        .innerJoinAndSelect('tarefa.tipoTarefa', 'Tipotarefa')
        .where("tarefa.idusuario = :idUsuario", { idUsuario })
        .andWhere("tarefa.idtipotarefa = :idtipotarefa", { idtipotarefa })
        .andWhere("WEEK(tarefa.dtTarefa) = :semana", { semana })
        .getMany();
        
       }
       
    return new Error('Registro nao encontrado');
}
const postTarefa = async (pst:ITarefa): Promise<Tarefa | Error> =>{
    
   try {
    var t = await tarefasRepository.findOne({ where:{ idTarefa:pst.idTarefa}});

   console.log(t)
   
   /*if(t!=null){
    console.log('popopopopopo',t)    
    return new Error("Categoria ja existe");

    }*/
    var tarefa = tarefasRepository.create(pst);
    
    await tarefasRepository.save(tarefa);
    
    console.log('popopopopopo',t) 
    return tarefa;
   } catch (error:any) {
    console.log(JSON.stringify(error.sqlMessage))
   
    return Error(JSON.stringify(error.sqlMessage));
   } 
}
const putTarefa = async (pst:ITarefa): Promise<Tarefa | Error> =>{
    console.log('nnnnnnnnnnnnnnn',pst)
    
    const t = await tarefasRepository.findOne({ where:{ idTarefa:pst.idTarefa}});
    
    if(t!=null){
        t.dtLembreteTarefa = pst.dtLembreteTarefa;
        t.dtTarefa = pst.dtTarefa;
        t.idTarefa = pst.idTarefa;
        t.idTipoTarefa = pst.idTipoTarefa;
        t.idUsuario = pst.idUsuario;
        t.nmTarefa = pst.nmTarefa;
        t.nrRecorrenciaTarefa = pst.nrRecorrenciaTarefa;
        t.statusTarefa = pst.statusTarefa;
        await tarefasRepository.save(t);
        console.log('popopopopopo',t) 
     return t;
     }    
     
     return new Error('Nao encontrado registro para atualização')
 }

const deleteTarefa = async (idTarefa:any): Promise<string|Error>=>{
    try{
        const userToRemove = await tarefasRepository.findOne({ where:{ idTarefa:idTarefa}});
        if (userToRemove) {
            console.log(userToRemove)
            await tarefasRepository.remove(userToRemove);
            return 'usuario excluido com sucesso';
        }else {
            return 'usuario não encontrado'
        }            
    } catch (error) {
        console.log('Ocorreu um erro ao excluir o usuário:', error);
        return Error(`Erros ocorreram: ${error}`)
    }
}

export default {putTarefa, getTarefas, getTarefasByParam, postTarefa, deleteTarefa };