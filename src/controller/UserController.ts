import { Request, response, Response } from "express";
import { UserService } from "../service/UserService";
import HTTPResponseHandler from '../handlers/HTTPResponseHandler';
import { runInThisContext } from "vm";

export class UserController {

    private service: UserService

    constructor(){
        this.service = new UserService();
    }

    public createUser = (req:Request , res:Response) => {
        const { email , password } = req.body
        this.service.createUser(email , password)
            .then( userCredentials => HTTPResponseHandler.sendSuccess(res , userCredentials))       
            .catch(error => HTTPResponseHandler.sendInternalError(res , error.message , null))
    }

    public authenticateUser = (req:Request , res:Response) => {
        const { email , password } = req.body;
        this.service.authenticateUser(email , password)
            .then( userCredentials => HTTPResponseHandler.sendSuccess(res , userCredentials))
            .catch( error => HTTPResponseHandler.sendInternalError(res , error.message , null))

    }
}