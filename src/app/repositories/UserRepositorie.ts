import {User} from "../entities/User";
import { IUser } from "../interfaces/IUser";
import { AppDataSource } from "../../database/data-source";

type UsuarioRequest = {
    
    name:string;
    email:string;
    password:string;
}

const userRepository = AppDataSource.getRepository(User);

const getUsers =(): Promise<IUser[]> =>{
    return userRepository.find()
}

const getUserByParam = async (param:any): Promise<IUser|Error> =>{
    var users = await userRepository.findOne({
        where:{
            name:param
        }
    });
    if (users){
        return users;
    }
    var users = await userRepository.findOne({
        where:{
            id:param
        }
    });
    if (users){
        return users;
    }
    var users = await userRepository.findOne({
        where:{
            email:param
        }
    });
    if (users){
        return users;
    }
    return new Error('Registro nao encontrado');
}

const postUser = async ({name, email, password}: UsuarioRequest ): Promise<IUser | Error> =>{
   
    if(await userRepository.findOne({ where: { name }})){
        return new Error("Categoria ja existe");
    }

    const user = userRepository.create({
       name,
        email,
        password
    });

    await userRepository.save(user);
    return user;
}

export default { getUsers, getUserByParam, postUser };