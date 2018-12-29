import { Injectable } from "@angular/core";

@Injectable()
export class UserDTO{
    constructor(){

    }
    public name : string; 
    public pass : string;
    email: string;   
    login: string;
}
