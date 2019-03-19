
import { NavController, IonicPage } from 'ionic-angular';
import { Component} from '@angular/core';
import { UserDTO  } from '../../model/user.dto';
import { TabsPage } from '../tabs/tabs';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
  
})
export class LoginPage {

  constructor(
    public navCtrl: NavController,
    //public pd: PageData,
    public user: UserDTO) {

  }
  pass    : string = "";
  userName: string = "";
  

  goToHome(params){
    
    if(this.userName == ""){
      alert("Login é obrigatorio");
      return;
    }
    if(this.pass == ""){
      alert("Senha é obrigatoria");
      return;
    }
    if (this.pass == "vanilson" || this.pass == "123") {
      this.navCtrl.setRoot(TabsPage);
    }else{
      alert("Usuario ou senha incorretos!");      
    }
    //this.user.name = this.userName;
    //this.user.pass = this.pass;

    //this.pd.setUserLogged(this.user);
    //console.log(`Usuario `+ this.userName +`\nSenha ` +this.pass);
  }
  ionViewDidLoad(){  
    /*if(this.isLogged()){
      this.navCtrl.setRoot(HomePage);
    }//*/
  }
  //Temporary
  public isLogged (){
    return false;
  }
}
