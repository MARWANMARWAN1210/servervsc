import { compareSync } from "bcrypt";
import { AuthentificatedUser } from "../models/user.model";
import { LoggerService } from "./logger.service";
import { UserService } from "./users.service";
import { generateFakeToken, validateFakeToken } from "../utils/token.utils";
import { NextFunction, Response } from "express";
import {AuthenticatedRequest} from "../models/auth.modeL"
import { isString } from "../utils/guards";

export class AuthService {
    public static login(username : string, password : string) : AuthentificatedUser | null {
        const user = UserService.getByUserName(username);
        if(!user) {
            LoggerService.error("Login : utilisateur introuvable");
            return null;
        }

        const passwordValid = compareSync(password, user.password);
        if(!passwordValid){
            LoggerService.error("Login : mot de passe incorrect");
            return null;
        }
        const token = generateFakeToken(username);
        if(!token){
            LoggerService.error("Login : erreur génération token")
            return null;
        }

        return {
            username : user.username,
            token: token
        };

    }

    public static authorize (req:AuthenticatedRequest, res:Response,next:NextFunction) {

    
            const token = (req as any).headers.authorization;
            console.log("TOKEN RECU",token);
            if(!isString(token)) {
            res.status(401).send("Unauthorized")
            return;
        }


        const username = validateFakeToken(token);
        if(!username){
            res.status(401).send("Unauthorized");
            return;
        }


        const user = UserService.getByUserName(username);
        if(!user){
            res.status(401).send("Unauthorized")
            return;
        }


        req.user = user;
        return next();
}
}
