import  jwt from 'jsonwebtoken';
import { ILogin } from './../interfaces/ILogin';
import {User} from "../entities/User";
import { AppDataSource } from "../../database/data-source";
import { decrypt } from "sjcl";
import { decryptando, encryptando } from "../../Extensions/EncriptDecript";
import { Request, Response } from "express";

const SECRET_KEY = "abrakadabra";


const userRepository = AppDataSource.getRepository(User);


const login = async (email:string, password:string): Promise<boolean> => {
    var users = await userRepository.findOne({
        where:{email}
    });
    

    if(users){
        console.log(email)
        console.log(password)
        
        console.log(decryptando(users.password))
        if(decryptando(users.password)==password){
            return true
        }
        return false;
    }else{
        console.log(password)
        return false;
    }
    
}
  
export default login ;