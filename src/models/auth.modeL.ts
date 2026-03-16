import { EROLES, User } from "./user.model";
import { Request } from "node-fetch";

export interface AuthenticatedRequest extends Request 
{
    user?: User;
}
export interface LoginResponseDTO {
    username : string;
    token : string;
    role : EROLES;
}