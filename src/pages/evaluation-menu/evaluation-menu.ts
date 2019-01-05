import { HomePage } from './../home/home';
import { MyApp } from './../../app/app.component';
import { TabsPage } from './../tabs/tabs';
import { ChecklistPage } from './../checklist/checklist';
import { Component     } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

/**
 * Generated class for the EvaluationMenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-evaluation-menu',
  templateUrl: 'evaluation-menu.html',
})
export class EvaluationMenuPage {  

  constructor(
    public navCtrl  : NavController, 
    public navParams: NavParams, 
    public alertCtrl: AlertController, ) {
  }
  ShowText (text: string){
    const alert = this.alertCtrl.create({
      title: 'Fase de produção',
      subTitle: text,
      buttons: ['Entendi :)']
    });
    alert.present();

  }
  goback(){
    if(this.navCtrl.length() > 1){
      this.navCtrl.popTo(TabsPage);
    }else{
      this.navCtrl.push(TabsPage);
    }
  }
  goToChecklist(){
    this.navCtrl.push('ChecklistPage');
  }
  ionViewDidLoad() {
    //console.log('ionViewDidLoad EvaluationMenuPage');
  }

}
