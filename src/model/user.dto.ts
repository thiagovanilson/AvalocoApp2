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
    // {
    //     "cpf"  : "099.933.994-00",
    //     "nome" : "Vanilson",
    //     "tipo" : "AVALIADOR",
    //     "email":"vanilson@email.com",
    //     "login": "vanilson",
    //     "senha": "123",
    //     "ie":{
    //             "codigo": 1
    //     }
    // }
}
