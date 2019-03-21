import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';

/**
 * Generated class for the FinalConsiderationsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-final-considerations',
  templateUrl: 'final-considerations.html',
})
export class FinalConsiderationsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FinalConsiderationsPage');
  }
  goback(){
    if(this.navCtrl.length() > 1){
      //Previus page
      this.navCtrl.popTo(TabsPage);
    }else{
      //Home page
      this.navCtrl.push(TabsPage);
    }
  }
}
