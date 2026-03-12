import { UserMapper } from "../mappers/users.mapper";
import { NewUser, User, UserDBO } from "../models/user.model";
import { FilesService } from "./files.service";
import { LoggerService } from "./logger.service";

export class UserService {
    public static create (newuser : NewUser) : User {

        let allUsers : UserDBO [] = [];

        try {
            allUsers = FilesService.readFile<UserDBO>("data/user.json")
        } catch (error) {
            LoggerService.error(error)
            allUsers = [];
            
        }

        const newUserDBO : UserDBO = {
            id: 0,
            username : newuser.userName,
            password : crnewuser.password,
            role : newuser.role,
            email : newuser.email,
            last_name : newuser.lastName,
            first_name : newuser.firstName,

            
        }
        allUsers.push(newUserDBO);
       
        FilesService.writeFile("data/user.json", allUsers)
        return UserMapper.fromDBO(newUserDBO);



 
        // lire les users dans le fichier users.json 
        // cela renverra un tableau de de usersdbo
        
        // converir le newuser en newuserdbo
        // ajouer le newuserdbo au ableau

        // réécrire la fichier users.json

        //renvoer le user 

    }
}