import { Injectable   } from "@angular/core";
import { UserDTO      } from "../model/user.dto";
import { API_CONFIG   } from "../config/api.config";
import { Observable } from "rxjs/Observable";
import { HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable()
export class UserService{
    static userName: string = "";
  
    constructor (public http: HttpClient) {

    }

    //Get a user with the login passed
    getUserByLogin(login: string) : Observable <UserDTO>{
        return this.http.get<UserDTO>(`${API_CONFIG.baseUrl}/usuario/1`);
    }  
    static setUserName( name : string){
        this.userName = name;
    }
    public user:UserDTO;
    
    getUserLogged() : UserDTO{
        if(this.user == null){
        //this.navCtrl.setRoot('LoginPage');
        }
        return this.user;
    }
    setUserLogged(userLogged: UserDTO){
        this.user = userLogged;
    }
}