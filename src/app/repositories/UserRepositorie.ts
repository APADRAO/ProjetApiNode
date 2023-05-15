import {User} from "../entities/User";
import { IUser } from "../interfaces/IUser";
import { AppDataSource } from "../../database/data-source";
import { decrypt } from "sjcl";
import { decryptando, encryptando } from "../../Extensions/EncriptDecript";

type UsuarioRequest = {
    
    name:string;
    email:string;
    password:string;
}

const userRepository = AppDataSource.getRepository(User);

const getUsers = async (): Promise<IUser[]> =>{
    var users = await userRepository.find();
    var ret:User[] = [];
    users.forEach(async element => {
        var e = element;
        var pass = await decryptando(e.password);
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
            id:param
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
    return new Error('Registro nao encontrado');
}

const postUser = async ({name, email, password}: UsuarioRequest ): Promise<IUser | Error> =>{
   
    if(await userRepository.findOne({ where: { name }})){
        return new Error("Categoria ja existe");
    }
    password = await encryptando(password);
    var user = userRepository.create({
       name,
        email,
        password
    });
    
    await userRepository.save(user);
    return user;
}

export default { getUsers, getUserByParam, postUser };