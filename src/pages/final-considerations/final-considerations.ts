import { GeneralService } from './../../domain/general.service';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Component    } from '@angular/core';
import { TabsPage     } from '../tabs/tabs';
import { AvaliacaoDTO } from '../../model/avaliacao.dto';

@IonicPage()
@Component({
  selector: 'page-final-considerations',
  templateUrl: 'final-considerations.html',
})
export class FinalConsiderationsPage {
  public evaluation      : AvaliacaoDTO = this.navParams.get('avaliacao');
  public title : string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public gservice : GeneralService ) {

  }

  ionViewDidLoad() {
    if(this.evaluation == null){
      this.goback();
    }
    this.title = this.gservice.nameAndDateToTitle(this.evaluation);

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
