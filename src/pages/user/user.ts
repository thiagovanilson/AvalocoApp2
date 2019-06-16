import { IonicPage, NavParams, AlertController, NavController } from 'ionic-angular';
import { Component   } from '@angular/core';
import { LoginPage   } from '../login/login';
import { API_CONFIG  } from '../../config/api.config';
import { UserService } from '../../domain/user.service';
import { AboutPage   } from '../about/about';
import { GeneralService } from '../../domain/general.service';

/**
 * Generated class for the UserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage {
  about : any;
  email : string; 
  public login : string;
  public pass: string = "";

  constructor(
    public alertCtrl: AlertController, 
    public navCtrl  : NavController, 
    public navParams: NavParams,
    public uService : UserService,
    public gService : GeneralService) {

      this.about = AboutPage;
  }
  getUserName(){
    
    if(this.uService.getUserLogged() != null){
      return this.uService.getUserLogged().nome;
    }
    return "";
  }
  getEmail(){
    if(this.uService.getUserLogged() != null){
      return this.uService.getUserLogged().email;
    }
    return "";
  }
  
  getColor(){
    return API_CONFIG.buttonColor;
  }
  public logout(){
    this.navCtrl.push(LoginPage);
  }
  public goToHome (){
    this.navCtrl.pop();

    
  }
  save(){

    this.uService.getUserLogged().email = this.email;
    this.uService.getUserLogged().login = this.login;

    this.uService.alterUser(this.uService.getUserLogged()).subscribe(
      response => { 
        this.gService.showMessage("Dados salvos com sucesso! :D");
        this.goToHome();
      },
      (error) => {
        this.gService.showMessage("Erro ao alterar os dados!<br />Verifique sua conexão com a internet.");
      }  
    );  
  }
  
  ionViewDidLoad() {
    //It's possible user to be null?
    this.email = this.getEmail();
    this.login = this.uService.getUserLogged().login;
  }
}
