
import { Request, Response, Router } from "express";
import { IEmails } from './../app/Emails/interfaces/IEmails';
import { enviaEmail } from "../app/Emails/repositories/sendMail";


const emailRouter = Router();

emailRouter.post("/email", async (req: Request, response: Response): Promise<Response|Error> => {
    var db:IEmails = req.body
    const ret = await enviaEmail(db.to, db.subject, db.body);
    console.log(ret);
    if(ret instanceof Error){
        return response.status(400).json(ret);
    }
    return response.status(200).json(ret);
});
export default emailRouter