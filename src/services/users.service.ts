import { hashSync } from "bcrypt";
import { UserMapper } from "../mappers/users.mapper";
import { NewUser, User, UserDBO } from "../models/user.model";
import { FilesService } from "./files.service";
import { LoggerService } from "./logger.service";

export class UserService {
    
     public static getByUserName(userName: string): User | null {
        let allUsers: UserDBO[] = [];
 
        try {
            allUsers = FilesService.readFile<UserDBO>("data/users.json");
        } catch (error) {
            LoggerService.error(error);
            return null;
        }
 
        const foundUser = allUsers.find((u) => u.username === userName);
 
        if (!foundUser) return null;
 
        return UserMapper.fromDBO(foundUser);
    }
 
    public static create(newUser: NewUser): User {
        let allUsers: UserDBO[] = [];
 
        try {
            allUsers = FilesService.readFile<UserDBO>("data/users.json");
        } catch (error) {
            LoggerService.error(error);
            allUsers = [];
        }
 
        // Vérifier que le nom d'utilisateur n'existe pas déjà
        if (UserService.getByUserName(newUser.userName)) {
            throw new Error(`Le nom d'utilisateur "${newUser.userName}" est déjà utilisé.`);
        }
 
        const newUserDBO: UserDBO = {
            id:         allUsers.length + 1,
            username:   newUser.userName,
            password:   hashSync(newUser.password, 10),
            role:       newUser.role,
            email:      newUser.email,
            last_name:  newUser.lastName,
            first_name: newUser.firstName,
        };
 
        allUsers.push(newUserDBO);
        FilesService.writeFile("data/users.json", allUsers);
 
        return UserMapper.fromDBO(newUserDBO);
    }
}