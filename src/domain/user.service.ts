import { Injectable   } from "@angular/core";

@Injectable()
export class UserService{
    static userName: string = "";
  
    constructor(){

    }

    static getUserLogged()  {
        return this.userName;
    }
    static setUserName( name : string){
        this.userName = name;
    }
}