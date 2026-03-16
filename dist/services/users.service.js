"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const bcrypt_1 = require("bcrypt");
const users_mapper_1 = require("../mappers/users.mapper");
const files_service_1 = require("./files.service");
const logger_service_1 = require("./logger.service");
class UserService {
    static getByUserName(userName) {
        let allUsers = [];
        try {
            allUsers = files_service_1.FilesService.readFile("data/users.json");
        }
        catch (error) {
            logger_service_1.LoggerService.error(error);
            return null;
        }
        const foundUser = allUsers.find((u) => u.username === userName);
        if (!foundUser)
            return null;
        return users_mapper_1.UserMapper.fromDBO(foundUser);
    }
    static create(newUser) {
        let allUsers = [];
        try {
            allUsers = files_service_1.FilesService.readFile("data/users.json");
        }
        catch (error) {
            logger_service_1.LoggerService.error(error);
            allUsers = [];
        }
        // Vérifier que le nom d'utilisateur n'existe pas déjà
        if (UserService.getByUserName(newUser.userName)) {
            throw new Error(`Le nom d'utilisateur "${newUser.userName}" est déjà utilisé.`);
        }
        const newUserDBO = {
            id: allUsers.length + 1,
            username: newUser.userName,
            password: (0, bcrypt_1.hashSync)(newUser.password, 10),
            role: newUser.role,
            email: newUser.email,
            last_name: newUser.lastName,
            first_name: newUser.firstName,
        };
        allUsers.push(newUserDBO);
        files_service_1.FilesService.writeFile("data/users.json", allUsers);
        return users_mapper_1.UserMapper.fromDBO(newUserDBO);
    }
}
exports.UserService = UserService;
