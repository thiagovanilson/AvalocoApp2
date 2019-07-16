import { Injectable } from "@angular/core";

@Injectable()
export class UserDTO{
    constructor(){

    }
    codigo: number;
    cpf : string;
    nome : string; 
    tipo : string;
    email: string;   
    login: string;
    senha: string;
    ie:{
        codigo:number
    }
}
