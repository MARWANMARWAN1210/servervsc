"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMapper = void 0;
class UserMapper {
    static toNewUser(userdo) {
        return {
            userName: userdo.username,
            password: userdo.password,
            role: userdo.role,
            email: userdo.email,
            lastName: userdo.lastName,
            firstName: userdo.firstName,
        };
    }
    static fromDBO(userDBO) {
        return {
            id: userDBO.id,
            username: userDBO.username,
            password: userDBO.password,
            role: userDBO.role,
            email: userDBO.email,
            lastName: userDBO.last_name,
            firstName: userDBO.first_name
        };
    }
    static toUserDtO(user) {
        return {
            id: user.id,
            username: user.username,
            password: user.password,
            role: user.role,
            email: user.email,
            lastName: user.lastName,
            firstName: user.firstName
        };
    }
}
exports.UserMapper = UserMapper;
