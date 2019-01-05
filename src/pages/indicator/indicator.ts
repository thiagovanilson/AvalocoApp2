import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { API_CONFIG } from '../../config/api.config';
import { TabsPage } from '../tabs/tabs';

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
  public isCat(n:number) :boolean{
    try {
      
      return n != this.btSelected;
    } catch (error) {
      
    }
  }
  public btGetColor(param: number): string{
    if(param == this.btSelected){
      return this.gridColor;
    }
    return "#ffffff";
  }
  public changeButton(param : number){
    this.btSelected = param;

    if(param == this.btVisit){
      this.gridColor = "#cececf";
    }else if(param == this.btCheck){
      this.gridColor = "#9091f4";
    }else if(param == this.btChecked){
      this.gridColor = "#90ff91";
    }
  }
  goback(){
    if(this.navCtrl.length() > 1){
      this.navCtrl.popTo(TabsPage);
    }else{
      this.navCtrl.push(TabsPage);
    }
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad IndicatorPage');
  }

}
