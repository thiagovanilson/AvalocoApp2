import { AvaliacaoDTO    } from './../../model/avaliacao.dto';
import { AvalicaoService } from './../../domain/avaliacao.service';
import { API_CONFIG      } from './../../config/api.config';
import { Component       } from '@angular/core';
import { GeneralService  } from '../../domain/general.service';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { IndicatorDTO } from '../../model/indicator.dto';

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
  title: ""
  
  constructor( 
    public navCtrl  : NavController, 
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public avService: AvalicaoService,
    public gservice : GeneralService
    
  ) {
    this.title = this.navParams.data;
  }

  public _avaliacoesAbertas;
  public _avaliacoesAgendadas;

  public goToEvaluation(item : AvaliacaoDTO){
    if(this.title.startsWith('Avaliações Agendadas')){
      this.ShowText("Avaliaçoes agendadas não podem ser abertas.");
    }else{
      this.navCtrl.push('EvaluationMenuPage',{avaliacao : item});      
    }
  }
  public isOpened() :boolean{

    try {      
      return this.title.startsWith('Avaliações Abertas');
    } catch (error) {
      
    }
  }
  ShowText (text: string){
    const alert = this.alertCtrl.create({
      title: 'Aviso',
      subTitle: text,
      buttons: ['Ok']
    });
    alert.present();

  }
 
  public hasItens(): boolean{
    return ! (this._avaliacoesAbertas == null && this._avaliacoesAgendadas == null);
  }
  buttonColor(){
    return API_CONFIG.buttonColor;
  }
  ionViewDidLoad() {
    this.avService.findscheduled().subscribe(
      response => { 
        this._avaliacoesAgendadas = response;
      }
    );
    this.avService.findOpened().subscribe(
      response => { 
        this._avaliacoesAbertas = response;
      }
    );
  }
}
