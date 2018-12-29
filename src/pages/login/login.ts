import { HomePage } from './../home/home';
import { NavController, IonicPage } from 'ionic-angular';
import { Component} from '@angular/core';
import { UserDTO  } from '../../model/user.dto';

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
    //alert("This is my warning message" + params);

    if (!params) params = {};
    this.user.name = this.userName;
    this.user.pass = this.pass;

    //this.pd.setUserLogged(this.user);
    console.log(`Usuario `+ this.user.name +`\nSenha ` +this.user.pass);
    this.navCtrl.setRoot(HomePage);
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
