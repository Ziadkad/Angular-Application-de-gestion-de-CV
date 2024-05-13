import { Roles } from "../enums/roles";

export interface Companies {
    id: number,
    nom: string,
    email: string,
    password: string,
    capital: number,
    role : Roles,
}
