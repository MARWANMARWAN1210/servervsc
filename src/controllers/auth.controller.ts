import { Router, Request, Response } from "express";
import { isString } from "../utils/guards";
import { LoggerService } from "../services/logger.service";
import { AuthService } from "../services/auth.service";

export const authController = Router();

authController.post("/login",(req:Request, res:Response)=> {

    const username = req.body.username;
    const password = req.body.password;
    if(!isString(username) || !isString(password)){
        LoggerService.error("POST /auth/login");
        res.status(400).send("Info pas bonnes");
        return;
    }
    const result = AuthService.login(username,password)
    if(!result){
        res.status(401).send("Pas autorisé ")
        return;
    }
    res.status(200).json(result)
})