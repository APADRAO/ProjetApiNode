import { ITarefa } from '../Interfaces/ITarefa';
import { AppDataSource } from "../../../database/data-source";
import {Tarefa} from '../../../database/entities/Tarefas'


const tarefasRepository = AppDataSource.getRepository(Tarefa);

const getTarefas= async (): Promise<Tarefa[]> =>{
    var ret = await tarefasRepository.find();
    if(ret){
        return ret
    }
    return [];
} 

const getTarefasByParam = async (idTarefa?:any, idUsuario?:any, nmTarefa?:any, dt1?:any, dt2?:any): Promise<Tarefa[]|Error> =>{
   
        if(idTarefa){
        return await tarefasRepository.find({
            where:{
                idTarefa:parseInt(idTarefa)
            }
        });
       }
       if(idUsuario){
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
       if(dt1&&dt2){
console.log(`dts : ${dt1} e ${dt2}`)
        var startDate  = parseDateString(dt1);
        var endDate  = parseDateString(dt2);

        const query = tarefasRepository
        .createQueryBuilder('data')
        .where('data.dtTarefa BETWEEN :startDate AND :endDate',{startDate, endDate});
        return await query.getMany();
       }
    return new Error('Registro nao encontrado');
}
function parseDateString(dateString: any): Date {
    const dateParts = dateString.split('-'); // Supondo o formato da string como 'YYYY-MM-DD'
    const year = parseInt(dateParts[0]);
    const month = parseInt(dateParts[1]) - 1; // Os meses em JavaScript são baseados em zero (0 - 11)
    const day = parseInt(dateParts[2]);
  
    return new Date(year, month, day);
  }
const postTarefa = async (pst:ITarefa): Promise<Tarefa | Error> =>{
   
    if(await tarefasRepository.findOne({ where:{ idTarefa:pst.idTarefa}})){
        return new Error("Categoria ja existe");
    }
    var tarefa = tarefasRepository.create(pst);
    
    await tarefasRepository.save(tarefa);
    return tarefa;
}

export default { getTarefas, getTarefasByParam, postTarefa };