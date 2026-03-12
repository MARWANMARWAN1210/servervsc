import { NewUser, NewUserDTO, User, UserDBO, UserDTO } from "../models/user.model";

export class UserMapper {
    public static toNewUser(userdo: NewUserDTO) : NewUser {
        return {
            userName : userdo.username,
            password : userdo.password,
            role : userdo.role,
            email: userdo.email,
            lastName : userdo.lastName,
            firstName : userdo.firstName,
            
            

        };
    }
        public static fromDBO (userDBO: UserDBO): User {
            return {
            id : userDBO.id,
            username : userDBO.username,
            password : userDBO.password,
            role : userDBO.role,
            email : userDBO.email,
            lastName : userDBO.last_name,
            firstName : userDBO.first_name
            }
        }

    public static toUserDtO (user : User) : UserDTO {
        return {
            id : user.id,
            username : user.username,
            password : user.password,
            role : user.role,
            email : user.email,
            lastName : user.lastName,
            firstName : user.firstName

        }
    }
}