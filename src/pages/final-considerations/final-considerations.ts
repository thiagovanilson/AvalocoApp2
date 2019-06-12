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
    }else{
      this.title = this.gservice.nameAndDateToTitle(this.evaluation);
    }

  }
  getCod(){
    if(this.evaluation != null)
      return this.evaluation.codigo;
    return "";
  }
  goback(){
    if(this.navCtrl.length() > 1){
      //Previus page
      this.navCtrl.pop();
    }else{
      //Login page
      this.navCtrl.setRoot('LoginPage');
    }
  }
}
