import { API_CONFIG } from './../../config/api.config';
import { Component  } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';

/**
 * Generated class for the SchedulePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@IonicPage()
@Component({
  selector   : 'page-evaluation',
  templateUrl: 'evaluation.html',
})
export class EvaluationPage {
  title: ""
  
  
  constructor( 
    public navCtrl: NavController, 
    public navParams: NavParams,
    public alertCtrl: AlertController) {
    this.title = this.navParams.data;

  }
  public goToEvaluation(){
    if(this.title.startsWith('Avaliações agendadas')){
      this.ShowText("Avaliaçoes agendadas não podem ser abertas.");
    }else{
      this.navCtrl.push('EvaluationMenuPage');
    }
  }
  public isOpened() :boolean{
    try {
      
      return this.title.startsWith('Avaliações Abertas');
    } catch (error) {
      
    }
  }
  ShowText (text: string){
    const alert = this.alertCtrl.create({
      title: 'Aviso',
      subTitle: text,
      buttons: ['Ok']
    });
    alert.present();

  }
  buttonColor(){
    return API_CONFIG.buttonColor;
  }
  ionViewDidLoad() {
    //console.log('ionViewDidLoad SchedulePage');
  }
}
