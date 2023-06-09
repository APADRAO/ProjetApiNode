import { User } from '../../../database/entities/User';
//import {User} from "../entities/User";
import { IUser } from "../interfaces/IUser";
import { AppDataSource } from "../../../database/data-source";
import { decryptando, encryptando } from "../../Extensions/EncriptDecript";

type UsuarioRequest = {
    
    name:string;
    email:string;
    password:string;
}

const userRepository = AppDataSource.getRepository(User);

const getUsers = async (): Promise<User[]> =>{
    const users = await userRepository.find();
    
    const  ret:User[] = [];
    users.forEach( element => {
        const  e:User = element;
        var pass = decryptando(e.password);
        e.password = pass;
        ret.push(e);
    });
    return ret;
} 

const getUserByParam = async (param:any): Promise<IUser|Error> =>{
    var users = await userRepository.findOne({
        where:{
            name:param
        }
    });
    if (users){
        users.password = await decryptando(users.password)
        return users;
    }
    var users = await userRepository.findOne({
        where:{
            idUsuario:param
        }
    });
    if (users){
        users.password = await decryptando(users.password)
        return users;
    }
    var users = await userRepository.findOne({
        where:{
            email:param
        }
    });
    if (users){
        users.password = await decryptando(users.password)
        return users;
    }
    console.log(param);
    return new Error('Registro nao encontrado');
}

const postUser = async ({name, email, password}: UsuarioRequest ): Promise<IUser | Error> =>{
   
    if(await userRepository.findOne({ where: { name }})){
        return new Error("Categoria ja existe");
    }
    password = encryptando(password);
    var user = userRepository.create({
       name,
        email,
        password
    });
    
    await userRepository.save(user);
    return user;
}  

const getUserByid  = async (param:any): Promise<User> =>{
    var users =await userRepository.findOne({
        where:{
            idUsuario:param
        }
    });
    if(users!=null){
        return users;
    }
    return new User;
}


export default { getUsers, getUserByParam, postUser , getUserByid};