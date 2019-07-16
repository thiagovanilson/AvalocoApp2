import { AvalicaoService } from './../../domain/avaliacao.service';
import { GlossaryItemDTO } from './../../model/glossaryItem';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { AvaliacaoDTO } from '../../model/avaliacao.dto';

/**
 * Generated class for the GlossaryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-glossary',
  templateUrl: 'glossary.html',
})
export class GlossaryPage {

  itens : GlossaryItemDTO[];
  public evaluation  : AvaliacaoDTO = this.navParams.get('avaliacao');

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public avService: AvalicaoService) {
      
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad GlossaryPage');
    if(this.evaluation == null){
      this.navCtrl.setRoot(TabsPage);      
    } else {
      this.avService.getGlossaryByEvaluation(this.evaluation.codigo).subscribe(
        response => { 
          this.itens = response;
        }
      );
    }
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
