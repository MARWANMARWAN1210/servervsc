"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const express_1 = require("express");
const guards_1 = require("../utils/guards");
const logger_service_1 = require("../services/logger.service");
const auth_service_1 = require("../services/auth.service");
exports.authController = (0, express_1.Router)();
exports.authController.post("/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    if (!(0, guards_1.isString)(username) || !(0, guards_1.isString)(password)) {
        logger_service_1.LoggerService.error("POST /auth/login");
        res.status(400).send("Info pas bonnes");
        return;
    }
    const result = auth_service_1.AuthService.login(username, password);
    if (!result) {
        res.status(401).send("Pas autorisé ");
        return;
    }
    res.status(200).json(result);
});
