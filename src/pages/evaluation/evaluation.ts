import { UserService     } from './../../domain/user.service';
import { AvaliacaoDTO    } from './../../model/avaliacao.dto';
import { AvalicaoService } from './../../domain/avaliacao.service';
import { API_CONFIG      } from './../../config/api.config';
import { Component       } from '@angular/core';
import { GeneralService  } from '../../domain/general.service';
import { IonicPage, NavController, NavParams, AlertController, Platform } from 'ionic-angular';

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
    public gservice : GeneralService,
    public uService : UserService,
    private platform: Platform
  ) {
    this.platform.registerBackButtonAction(() => {
    this.navCtrl.pop();
    });
    this.title = this.navParams.data;

    platform.ready().then(() => {      

      setInterval(() => {
      //console.log("Espera " + this.cont++ )
        this.loadItens();

      },5000);  //minutes to update data
    }
    ) 
  }

  public _avaliacoesAbertas   : AvaliacaoDTO[];
  public _avaliacoesAgendadas : AvaliacaoDTO[];
  public _avaliacoesEncerradas: AvaliacaoDTO[];

  public hasConection = false;

  public goToEvaluation(item : AvaliacaoDTO){
    if( this.title.startsWith('Avaliações Agendadas')){
      this.ShowText("Avaliaçoes agendadas não podem ser abertas.");
    }
    else{
      this.navCtrl.push('EvaluationMenuPage',{avaliacao : item});      
    }
  }
  public isOpened() :boolean{

    try {      
      return this.title.startsWith('Avaliações Abertas');
    } catch (error) {
      
    }
  }
  public isDone() :boolean{

    try {      
      return this.title.startsWith('Avaliações Finalizadas');
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
    if(this.uService.getUserLogged == null){      
      this.navCtrl.push("LoginPage");      
    }
    this.loadItens();
    
  }

  public loadItens(){
    if(this.uService.getUserLogged() != null){      
    
      this.hasConection = true;

      if(this.title.startsWith('Avaliações Abertas')){
        this.avService.findOpened(this.uService.getUserLogged().codigo).subscribe(
          response => { 
            this._avaliacoesAbertas = response;
          },
          (error) => {
            this.hasConection = false;
          }
        );
      }
      if(this.title.startsWith('Avaliações Finalizadas')){
        this.avService.findsDone(this.uService.getUserLogged().codigo).subscribe(
          response => { 
            this._avaliacoesEncerradas = response;
          },
          (error) => {
            this.hasConection = false;
          }
        );
      }
      this.avService.findscheduled(this.uService.getUserLogged().codigo).subscribe(
        response => { 
          this._avaliacoesAgendadas = response;
        },
        (error) => {
          this.hasConection = false;
        }
      );
    }
  }
}
