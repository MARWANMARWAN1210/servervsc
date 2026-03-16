"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const bcrypt_1 = require("bcrypt");
const logger_service_1 = require("./logger.service");
const users_service_1 = require("./users.service");
const token_utils_1 = require("../utils/token.utils");
const guards_1 = require("../utils/guards");
class AuthService {
    static login(username, password) {
        const user = users_service_1.UserService.getByUserName(username);
        if (!user) {
            logger_service_1.LoggerService.error("Login : utilisateur introuvable");
            return null;
        }
        const passwordValid = (0, bcrypt_1.compareSync)(password, user.password);
        if (!passwordValid) {
            logger_service_1.LoggerService.error("Login : mot de passe incorrect");
            return null;
        }
        const token = (0, token_utils_1.generateFakeToken)(username);
        if (!token) {
            logger_service_1.LoggerService.error("Login : erreur génération token");
            return null;
        }
        return {
            username: user.username,
            token: token
        };
    }
    static authorize(req, res, next) {
        const token = req.headers.authorization;
        console.log("TOKEN RECU", token);
        if (!(0, guards_1.isString)(token)) {
            res.status(401).send("Unauthorized");
            return;
        }
        const username = (0, token_utils_1.validateFakeToken)(token);
        if (!username) {
            res.status(401).send("Unauthorized");
            return;
        }
        const user = users_service_1.UserService.getByUserName(username);
        if (!user) {
            res.status(401).send("Unauthorized");
            return;
        }
        req.user = user;
        return next();
    }
}
exports.AuthService = AuthService;
