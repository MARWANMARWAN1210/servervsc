"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const express_1 = require("express");
const logger_service_1 = require("../services/logger.service");
const guards_1 = require("../utils/guards");
const users_mapper_1 = require("../mappers/users.mapper");
const users_service_1 = require("../services/users.service");
exports.userController = (0, express_1.Router)();
exports.userController.post("/", (req, res) => {
    logger_service_1.LoggerService.info("POST /users/ création d'un nouveau user");
    const newUserDTO = req.body;
    if (!(0, guards_1.isNewUser)(newUserDTO)) {
        logger_service_1.LoggerService.error("Pas les bonnes info" + JSON.stringify);
        res.status(400).send("Info pas bonnes");
        return;
    }
    const newUser = users_mapper_1.UserMapper.toNewUser(newUserDTO);
    const user = users_service_1.UserService.create(newUser);
    const userDTO = users_mapper_1.UserMapper.toUserDtO(user);
    res.status(201).json(userDTO);
});
