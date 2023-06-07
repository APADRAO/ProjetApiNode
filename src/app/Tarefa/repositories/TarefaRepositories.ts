import { ITarefa } from '../Interfaces/ITarefa';
import { AppDataSource } from "../../../database/data-source";
import {Tarefa} from '../../../database/entities/Tarefas'
import DateParser from '../../Extensions/DateFunction';

const dateParser = new DateParser("yyyy-MM-dd");
const tarefasRepository = AppDataSource.getRepository(Tarefa);

const getTarefas= async (): Promise<Tarefa[]> =>{
    var ret = await tarefasRepository.find();
    if(ret){
        return ret
    }
    return [];
} 

const getTarefasByParam = async (idTarefa?:any, idUsuario?:any, nmTarefa?:any, dt1?:any, dt2?:any, semana?:any): Promise<Tarefa[]|Error> =>{
   
        if(idTarefa){
        return await tarefasRepository.find({
            where:{
                idTarefa:parseInt(idTarefa)
            }
        });
       }
       if(idUsuario&&!semana){
        return await tarefasRepository.find({
            where:{
                idUsuario:parseInt(idUsuario)
            }
        });
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
       if(semana!=null && idUsuario==0){
        console.log(semana,idUsuario)
        return await tarefasRepository
        .createQueryBuilder('tarefa')
        .innerJoinAndSelect('tarefa.user', 'User')
        .innerJoinAndSelect('tarefa.tipoTarefa', 'TipoTarefa')
        .where("WEEK(tarefa.dtTarefa) = :semana", { semana })
        .getMany();
        
       }
       if(semana!=null && idUsuario!=null){
        
        return await tarefasRepository
        .createQueryBuilder('tarefa')
        .innerJoinAndSelect('tarefa.user', 'User')
        .where("tarefa.idusuario = :idUsuario", { idUsuario })
        .andWhere("WEEK(tarefa.dtTarefa) = :semana", { semana })
        .getMany();
        
       }
       
    return new Error('Registro nao encontrado');
}
const postTarefa = async (pst:ITarefa): Promise<Tarefa | Error> =>{
   var t = await tarefasRepository.findOne({ where:{ idTarefa:pst.idTarefa}});
   //console.log(t)
   
   /*if(t!=null){
    console.log('popopopopopo',t)    
    return new Error("Categoria ja existe");

    }*/
    var tarefa = tarefasRepository.create(pst);
    
    await tarefasRepository.save(tarefa);
    
    console.log('popopopopopo',t) 
    return tarefa;
}

const deleteTarefa = async (idTarefa:any): Promise<string|Error>=>{
    try{
        const resultado = await tarefasRepository
        .createQueryBuilder()
        .delete()
        .from(Tarefa)
        .where("idTarefa >= :idTarefa", { idTarefa })
        .execute();

        const linhasAfetadas = resultado.affected ?? 0;
        return`Foram excluídas ${linhasAfetadas} tarefas.`;
            
    } catch (error) {
        return Error(`Erros ocorreram: ${error}`)
    }
}

export default { getTarefas, getTarefasByParam, postTarefa, deleteTarefa };