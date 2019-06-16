import { Injectable   } from "@angular/core";
import { UserDTO      } from "../model/user.dto";
import { API_CONFIG   } from "../config/api.config";
import { Observable   } from "rxjs/Observable";
import { HttpClient   } from "@angular/common/http";

@Injectable()
export class UserService{
    static userName: string = "";
  
    constructor (public http: HttpClient) {

    }

    //Get a user with the login passed
    getUserByLogin(login: string) : Observable <UserDTO>{
        return this.http.get<UserDTO>(`${API_CONFIG.baseUrl}/usuario/login/${login} `);
        //return this.http.get<UserDTO>(`${API_CONFIG.baseUrl}/usuario/1 `);
    }  
    alterUser(user : UserDTO){
        return  this.http.put <UserDTO>(`${API_CONFIG.baseUrl}/usuario/${user.codigo}`, user);
    }
    static setUserName( name : string){
        this.userName = name;
    }
    public user:UserDTO;
    
    getUserLogged() : UserDTO{
        // if(this.user == null){
        //  //this.navCtrl.setRoot('LoginPage');
        // }
        return this.user;
    }
    setUserLogged(userLogged: UserDTO){
        this.user = userLogged;
    }
}