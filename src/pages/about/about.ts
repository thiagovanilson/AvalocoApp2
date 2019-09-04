import { API_CONFIG    } from './../../config/api.config';
import { Component     } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TabsPage      } from '../tabs/tabs';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  constructor(public navCtrl: NavController) {

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
  public version = API_CONFIG.version;
}
