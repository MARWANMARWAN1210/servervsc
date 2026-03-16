import { Router, Request, Response } from "express";
import { LoggerService } from "../services/logger.service";
import { NewUserDTO } from "../models/user.model";
import { isNewUser } from "../utils/guards";
import { UserMapper } from "../mappers/users.mapper";
import { UserService } from "../services/users.service";

export const userController = Router();

userController.post("/",(req:Request, res:Response) => {
    LoggerService.info("POST /users/ création d'un nouveau user")
    const newUserDTO : NewUserDTO = req.body;
    
    if(!isNewUser(newUserDTO)){
        LoggerService.error("Pas les bonnes info" + JSON.stringify)
        res.status(400).send("Info pas bonnes")
        return;
    }
    
    const newUser = UserMapper.toNewUser(newUserDTO);
    const user = UserService.create(newUser);
    const userDTO = UserMapper.toUserDtO(user);

    res.status(201).json(userDTO);


})