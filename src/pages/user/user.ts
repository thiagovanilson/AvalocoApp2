import { TabsPage } from './../tabs/tabs';
import { IonicPage, NavParams, AlertController, NavController } from 'ionic-angular';
import { Component   } from '@angular/core';
import { LoginPage   } from '../login/login';
import { API_CONFIG  } from '../../config/api.config';
import { UserService } from '../../domain/user.service';
import { AboutPage   } from '../about/about';

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

  constructor(
    public alertCtrl: AlertController, 
    public navCtrl  : NavController, 
    public navParams: NavParams,
    public uService : UserService
    ) {
      this.about = AboutPage;
  }
  getUserName(){
    
    var user = this.uService.getUserLogged();
    if(user != null){
      return user.nome;
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
    const alert = this.alertCtrl.create({
      title: 'Salvo com sucesso!',
      subTitle: 'Todas as alterações foram salvas',
      buttons: ['Ok']
    });
    alert.present();
    this.navCtrl.push(TabsPage);
  }
  ionViewDidLoad() {
    //console.log('ionViewDidLoad UserPage');
  }
}
