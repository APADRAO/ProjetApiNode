import { TipoTarefa } from "../../../database/entities/TipoTarefa";
import { AppDataSource } from "../../../database/data-source";
import { ItipoTarefa } from "../../Tarefa/Interfaces/ITarefa";

const userRepository = AppDataSource.getRepository(TipoTarefa);

const get = async (): Promise<ItipoTarefa[]> =>{
    const tptar = await userRepository.find();
    
    const  ret:ItipoTarefa[] = [];
    tptar.forEach( element => {
        ret.push(element);
    });
    return ret;
} 

const getByParam = async (param:any): Promise<ItipoTarefa|Error> =>{
    var tptar = await userRepository.findOne({
        where:{
            nametar:param
        }
    });
    if (tptar){
        return tptar;
    }
    var tptar = await userRepository.findOne({
        where:{
            idTipoTarefa:param
        }
    });
    if (tptar){
        return tptar;
    }
    
    console.log(param);
    return new Error('Registro nao encontrado');
}

const post = async ({nametar,idTipoTarefa  }: ItipoTarefa ): Promise<ItipoTarefa | Error> =>{
   
    if(await userRepository.findOne({ where: { nametar }})){
        return new Error("Categoria ja existe");
    }
    var tptar = userRepository.create({ nametar, idTipoTarefa });
    
    await userRepository.save(tptar);
    return tptar;
}  

export default { get, getByParam, post};