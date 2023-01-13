import { Role } from "./role";
import { Session } from "./session";


export class User {
    Id!: number;
    UserName!: String;
    Email!: string;
    Role! : Role;
    Permisions!: string[];
    Apellidos!: string;
    Celular!: string;
    Alias!: string;    
    Token!: Session;
}