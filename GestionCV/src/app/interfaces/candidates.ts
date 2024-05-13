import { Roles } from "../enums/roles";
import { Skills } from "../enums/skills";

export interface Candidates {
    id: number,
    nom: string,
    prenom: string,
    datenaissance : Date,
    email: string,
    password: string,
    cv: string,
    skills: Skills[],
    role : Roles
}
