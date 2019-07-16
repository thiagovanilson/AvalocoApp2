import { UserService      } from './../../domain/user.service';
import { GeneralService   } from './../../domain/general.service';
import { AvaliacaoDTO     } from './../../model/avaliacao.dto';
import { AvalicaoService  } from './../../domain/avaliacao.service';
import { ChecklistItemDTO } from '../../model/checklistItem.dto';
import { TabsPage         } from './../tabs/tabs';
import { Component        } from '@angular/core';
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
  public evaluation : AvaliacaoDTO = this.navParams.get('avaliacao');
  public itens      : ChecklistItemDTO[];
  public title      : string = "";

  constructor(
    public navCtrl   : NavController, 
    public navParams : NavParams, 
    public alertCtrl : AlertController, 
    public avService : AvalicaoService,
    public genService: GeneralService,
    public uServive  : UserService) {
  }
  ShowText (text: string){
    const alert = this.alertCtrl.create({
      title: 'Aviso',
      subTitle: text,
      buttons: ['Ok']
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
    this.navCtrl.push('ChecklistPage',{avaliacao : this.evaluation});
  }
  goToIndicator(){
    this.navCtrl.push('IndicatorPage',{avaliacao : this.evaluation});
  }
  public goToFinalConsiderations(){    
    this.navCtrl.push('FinalConsiderationsPage',{avaliacao : this.evaluation});       
  }
  ionViewDidLoad() {
    //proctect explosion.
    if(this.evaluation == null ||  this.uServive.getUserLogged() == null){
      // if(this.navCtrl.canSwipeBack())
      //   this.navCtrl.popAll();
      this.navCtrl.push("LoginPage");      
    } else {
      this.title = this.genService.nameAndDateToTitle(this.evaluation);
    }    
  }
}
