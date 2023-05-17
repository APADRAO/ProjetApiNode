import { IEmails } from './../app/Emails/interfaces/IEmails';
import { Request, Response, Router } from "express";
import { enviaEmail } from "../app/Emails/repositories/sendMail";
import { Return } from "../database/entities/Return";


const emailRouter = Router();

emailRouter.post("/email", async (req: Request, res: Response): Promise<string> => {
    var ret = new Return();
   var db:IEmails = req.body
   console.log(db);

    return await enviaEmail(db.to, db.subject, db.body);
});
export default emailRouter