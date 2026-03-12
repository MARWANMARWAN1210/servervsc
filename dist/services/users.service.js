"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const users_mapper_1 = require("../mappers/users.mapper");
const files_service_1 = require("./files.service");
const logger_service_1 = require("./logger.service");
class UserService {
    static create(newuser) {
        let allUsers = [];
        try {
            allUsers = files_service_1.FilesService.readFile("data/user.json");
        }
        catch (error) {
            logger_service_1.LoggerService.error(error);
            allUsers = [];
        }
        const newUserDBO = {
            id: 0,
            username: newuser.userName,
            password: newuser.password,
            role: newuser.role,
            email: newuser.email,
            last_name: newuser.lastName,
            first_name: newuser.firstName,
        };
        allUsers.push(newUserDBO);
        files_service_1.FilesService.writeFile("data/user.json", allUsers);
        return users_mapper_1.UserMapper.fromDBO(newUserDBO);
        // lire les users dans le fichier users.json 
        // cela renverra un tableau de de usersdbo
        // converir le newuser en newuserdbo
        // ajouer le newuserdbo au ableau
        // réécrire la fichier users.json
        //renvoer le user 
    }
}
exports.UserService = UserService;
