import { Request, Response, Router} from "express";
import jwt from "jsonwebtoken";
import login from '../app/Login/repositories/LoginRepositorie';
import { Return } from '../database/entities/Return';
import moment from 'moment';

const SECRET_KEY = "abrakadabra";

const loginRouter = Router();

loginRouter.post("/login", async (req: Request, res: Response): Promise<Return> => {
    
    var ret = new Return();
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
      ret.status = true;    
      ret.message = 'Sucesso';
      ret.objeto = res.status(200).json(stringRet);
    } else {
        ret.status = true;
        ret.message = 'Sucesso';
        ret.objeto= res.status(401).json('Falha na autenticação');
    }
    return ret
});
export default loginRouter;