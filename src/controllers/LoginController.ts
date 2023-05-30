import { Request, Response, Router} from "express";
import jwt from "jsonwebtoken";
import login from '../app/Login/repositories/LoginRepositorie';
import { Return } from '../database/entities/Return';
import moment from 'moment';
import { IResponseLogin } from "../app/Login/interfaces/IResponseLogin";

const SECRET_KEY = "abrakadabra";

const loginRouter = Router();

loginRouter.post("/login", async (req: Request, res: Response): Promise<IResponseLogin> => {
    
    var ret = new IResponseLogin();
    const { email, password } = req.body;
    if (await login(email, password)) {
        console.log(email); 
     var token = jwt.sign(
        {
          document: moment().format('DD/MM/YYYY'),
          user: email,
        },
        SECRET_KEY,
        {
          expiresIn: '1h',
        }
      );
      let stringRet = token.toString()
      console.log(stringRet);
      ret.jwt = res.status(200).json(stringRet).toString();
    } else {
        ret.jwt= res.status(401).json('Falha na autenticação').toString();
    }
    return ret
});
export class token{
  jwt:string='';
}
loginRouter.post('/jwtValidator', async (req: Request, res: Response): Promise<any> => {
  const token:token = await req.body;
  console.log("chave: ",SECRET_KEY)
  console.log("token: ",token)
    if (!SECRET_KEY){
      return  res.status(401).json({error:'chave Secreta Vazia'});
    }
    try { 
      if(token.jwt){
        jwt.verify(token.jwt, SECRET_KEY)
        ? res.json({status:true})
        : res.json({status:false})
        console.log('ok',res.status)
      }else{
        res.json({status:false})
        console.log('else', res.status)
      }
      return

    }catch (error){
      res.status(500).json({error:'jwt.verify not working'})
    }
  
})


export default loginRouter; 