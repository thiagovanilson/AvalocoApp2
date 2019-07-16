import { UserService } from './../../domain/user.service';
import { GeneralService } from './../../domain/general.service';
import { NavController, AlertController, ModalController, Platform } from 'ionic-angular';
import { Component       } from '@angular/core';
import { AvalicaoService } from '../../domain/avaliacao.service';
import { AvaliacaoDTO    } from '../../model/avaliacao.dto';
import { API_CONFIG      } from '../../config/api.config';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  //private cont :number = 1;

  constructor(
    public avaliacaoService: AvalicaoService,
    public alertCtrl       : AlertController,
    public platform        : Platform       ,
    public modalCtrl       : ModalController,
    public navCtrl         : NavController  ,
    public genService      : GeneralService,
    public uservice        : UserService){

      platform.ready().then(() => {      

        setInterval(() => {
        //console.log("Espera " + this.cont++ )
          this.updateData();
          
        },5000);  //minutes to update data
      }) //*/
  }
    
  public _avaliacoesAbertas   : AvaliacaoDTO[];
  public _avaliacoesAgendadas : AvaliacaoDTO[];
  public _avaliacoesEncerradas: AvaliacaoDTO[];

  protected hasConnection    : boolean;

  public get avaliacoesAbertas(): AvaliacaoDTO[] {
    return this._avaliacoesAbertas;
  }

  public get avaliacoesAgendadas(): AvaliacaoDTO[] {
    return this._avaliacoesAgendadas;
  }

  //Only for count the numbers of tests on open status
  public get qtdAvOpned(): number {
    if (this._avaliacoesAbertas == null)
      return 0;
    return this._avaliacoesAbertas.length;
  }

  //Only for count the numbers of tests on schedule status
  public get qtdAvSchedule(): number {
    if (this._avaliacoesAgendadas == null)
      return 0;
    return this._avaliacoesAgendadas.length;
  }

  ionViewDidLoad() {
   
    if(this.uservice.getUserLogged() == null){    
      this.navCtrl.setRoot('LoginPage');   
      return;  
    }else{
      //For load on the startup the screen. First time only.
      this.updateData(); 
      this.avaliacaoService.findAll(this.uservice.getUserLogged().codigo).subscribe(
        response => { 
          this.hasConnection = (response != null);
        }
      );//*/    
    } 
  }
  public updateData(){

    //To refresh data.    
    this.hasConnection = (this._avaliacoesAbertas != null || this._avaliacoesAgendadas != null);
   
    if(this.uservice.getUserLogged() != null){
      
    
      this.avaliacaoService.findOpened(this.uservice.getUserLogged().codigo).subscribe(
        response => { 
          this._avaliacoesAbertas = response;

          if(response == null){
            this.avaliacaoService.qtdOpned = 0;
          }else{
            this.avaliacaoService.qtdOpned = response.length;
          }
        }
      );
      this.avaliacaoService.findscheduled(this.uservice.getUserLogged().codigo).subscribe(
        response => { 
          this._avaliacoesAgendadas = response;

          if(response == null){
            this.avaliacaoService.qtdScheduled = 0;
          }else{
            this.avaliacaoService.qtdScheduled = response.length;

          }
        }
      );
      this.avaliacaoService.findsDone(this.uservice.getUserLogged().codigo).subscribe(
        response => { 
          this._avaliacoesEncerradas = response;

          if(response == null){
            this.avaliacaoService.qtdDone = 0;
          }else{
            this.avaliacaoService.qtdDone = response.length;
          }
        }
      );
    }
  }
  
  public goTo(addres) {
    this.navCtrl.push(addres)
  }//*/
  public goToEvaluation(item: AvaliacaoDTO){
    
    this.navCtrl.push('EvaluationMenuPage',{avaliacao : item});       
  }
  newDate: string[];

  public formatDate(oldDate: string): string  {
    return this.genService.formatDate(oldDate);
  }
  public buttonColor() {
    return API_CONFIG.buttonColor;
  }
  warnUser(params) {
    //this.navCtrl.push('MenuPage')
    /*
    this.avaliacaoService.findOpened().subscribe(
      response => { console.log(response) }
    );
    this.avaliacaoService.findOpened().subscribe(
      response => { this._avaliacoesAbertas = response }
    );//*/
    // this.avaliacaoService.findscheduled().subscribe(
    //   response => { this._avaliacoesAgendadas = response }
    // );
    const alert = this.alertCtrl.create({
      title: 'Titulo',
      subTitle: params,
      buttons: ['OK']
    });
    alert.present();

  }
}
