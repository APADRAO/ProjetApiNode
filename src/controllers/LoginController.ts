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
export default loginRouter;