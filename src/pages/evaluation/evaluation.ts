import { API_CONFIG } from './../../config/api.config';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
  constructor( public navCtrl: NavController, public navParams: NavParams) {
  }
  public goToEvaluation(){
    this.navCtrl.push('EvaluationMenuPage');
  }
  buttonColor(){
    return API_CONFIG.buttonColor;
  }
  ionViewDidLoad() {
    //console.log('ionViewDidLoad SchedulePage');
  }
}
