import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { API_CONFIG } from '../../config/api.config';

/**
 * Generated class for the IndicatorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-indicator',
  templateUrl: 'indicator.html',
})
export class IndicatorPage {
  private btVisit:   number = 0;
  private btCheck:   number = 1;
  private btChecked: number = 2;
  
  gridColor: string = "#cececf";
  private btSelected: number = 0; 

  public topicVisible = [true, true, true, true];
  openTopic( param:number){
    this.topicVisible.fill(true);
    this.topicVisible[param] = false;
  }
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  public btGetColor(param: number): string{
    if(param == this.btSelected){
      return this.gridColor;
    }
    return "#ffffff";
  }
  public changeButton(param : number){
    if(param == this.btVisit){
      this.btSelected = 0;
      this.gridColor = "#cececf";
    }else if(param == this.btCheck){
      this.btSelected = 1;
      this.gridColor = "#9091f4";
    }else if(param == this.btChecked){
      this.btSelected = 2;
      this.gridColor = "#90ff91";
    }
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad IndicatorPage');
  }

}
