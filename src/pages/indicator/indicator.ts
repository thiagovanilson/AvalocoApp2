import { GeneralService  } from './../../domain/general.service';
import { AvalicaoService } from './../../domain/avaliacao.service';
import { SeemPage        } from './../seem/seem';
import { Component       } from '@angular/core';
import { TabsPage        } from '../tabs/tabs';
import { IndicatorDTO    } from '../../model/indicator.dto';
import { AvaliacaoDTO    } from '../../model/avaliacao.dto';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-indicator',
  templateUrl: 'indicator.html',
})
export class IndicatorPage {
  
  private btCheck   : number = 1;
  private btChecked : number = 2;
  public evaluation : AvaliacaoDTO = this.navParams.get('avaliacao');
  public title      : string = "";

  public itens : IndicatorDTO[];
  gridColor: string = "#cececf";

  public btSelected       : number = 1; 
  public selectedIdicator : number = 1;

  public topicVisible = [true, true, true, true];

  openTopic( param:number){
    this.topicVisible.fill(true);
    this.topicVisible[param] = false;
  }
  constructor(
    public navCtrl   : NavController, 
    public navParams : NavParams,
    public modalCtrl : ModalController,
    public avService : AvalicaoService,
    public genService: GeneralService) {
  }
  presentProfileModal(args: string) {
    if(args.startsWith('SeemPage')){
      let profileModal = this.modalCtrl.create(SeemPage);

    }else{

    } 
    let profileModal = this.modalCtrl.create(args);
    profileModal.present();
  }
  
  public btGetColor(param: number): string{
    if(param == this.btSelected){
      return this.gridColor;
    }
    return "#ffffff";
  }
  public changeButton(param : number){
    this.btSelected = param;

    if(param == this.btCheck){
      this.gridColor = "#cececf";
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
  //Get of the evaluation
  updateIdicators(){
    if(this.evaluation == null)
      return;

    this.avService.getIndicatorByEvaluation(this.evaluation.codigo).subscribe(
      response => { 
        this.itens = response;
      } 
    ); 
  }
  changeSelection(num : number){
    this.selectedIdicator = num;
  }
  ionViewDidLoad() {
    
    this.updateIdicators();

    if(this.evaluation != null){
      this.title = this.genService.nameAndDateToTitle(this.evaluation);
    }      
  }
}
