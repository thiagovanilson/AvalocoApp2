import { IonicPage, NavParams, AlertController, NavController } from 'ionic-angular';
import { Component     } from '@angular/core';
import { LoginPage     } from '../login/login';
import { API_CONFIG    } from '../../config/api.config';
import { UserService   } from '../../domain/user.service';
import { AboutPage     } from '../about/about';
import { GeneralService} from '../../domain/general.service';

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

  public login      : string;
  public pass       : string = "";
  public newPass    : string = "";
  public confirmPass: string = "";
  public tel        : string = "";
  public showConfirmSave = false;
  
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
  showConfirm(){
    this.showConfirmSave = true;
  }
  hideConfirm(){
    this.showConfirmSave = false;
  }
  
  save(){

    if(this.pass != this.uService.getUserLogged().senha){
      this.gService.showMessage("Senha incoreta!");
      return;
    } 
    
    this.uService.getUserLogged().email    = this.email;
    this.uService.getUserLogged().login    = this.login;
    this.uService.getUserLogged().telefone = this.tel;

    //Verify if the user is trying to alter the password
    if(this.newPass != ""){
      if(this.newPass == this.confirmPass){
        this.uService.getUserLogged().senha = this.newPass;
      }else{
        this.gService.showMessage("As senhas não conferem!");
        return;
      }
    }

    //To save things like cellphone and email.
    this.uService.alterUser(this.uService.getUserLogged()).subscribe(
      response => { 
        this.gService.showMessage("Dados salvos com sucesso! :D");
        this.cleanPassFilds();
        this.hideConfirm();
      },
      (error) => {
        this.gService.showMessage("Erro ao alterar os dados!<br />Verifique sua conexão com a internet.");
      }  
    );  
  }
  cleanPassFilds(){
    this.pass        = "";
    this.newPass     = "";
    this.confirmPass = "";
  }
  ionViewDidLoad() {
    //It's possible user to be null?
    this.email = this.getEmail();
    this.login = this.uService.getUserLogged().login;
    this.tel   = this.uService.getUserLogged().telefone;
  }
}
