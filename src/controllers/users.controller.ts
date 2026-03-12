import { Router, Request, Response } from "express";
import { LoggerService } from "../services/logger.service";
import { NewUserDTO } from "../models/user.model";
import { isNewUser } from "../utils/guards";

export const userController = Router();

userController.post("/",(req:Request, res:Response) => {
    LoggerService.info("POST /users/ création d'un nouveau user")
    const newUserDTO : NewUserDTO = req.body;
    
    if(isNewUser(newUserDTO)){
        LoggerService.error("Pas les bonnes info" + JSON.stringify)
        res.status(400).send("Info pas bonnes")
        return;
    }


})