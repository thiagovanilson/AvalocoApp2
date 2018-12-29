import { TabsPage } from './../tabs/tabs';
import { IonicPage, NavParams, AlertController, NavController } from 'ionic-angular';
import { Component   } from '@angular/core';
import { LoginPage   } from '../login/login';

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

  constructor(public alertCtrl: AlertController, 
    public navCtrl: NavController, 
    public navParams: NavParams,
    ) {
  }
  getUser(){
    
    return "Vanilson";
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
