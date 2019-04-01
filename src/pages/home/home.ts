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
  private cont :number = 1;
  constructor(
    public platform: Platform,
    public avaliacaoService: AvalicaoService,
    public navCtrl  : NavController,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController) {

      platform.ready().then(() => {      

        setInterval(() => {
        console.log("Espera " + this.cont++ )
          this.updateData(); //sua função
        },900000);  //15 minutes to update data
      }) //*/
  }
    
  public _avaliacoesAbertas  : AvaliacaoDTO[];
  public _avaliacoesAgendadas: AvaliacaoDTO[];
  private _TodasAsAvaliacoes : AvaliacaoDTO[]; 
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
    /*
    this.avaliacaoService.findOpened().subscribe(
      response => { this._avaliacoesAbertas = response; }
    );
    this.avaliacaoService.findscheduled().subscribe(
      response => { this._avaliacoesAgendadas = response }
    );//*/
    
    //For load on the startup the screen. First time only.
    this.avaliacaoService.findAll().subscribe(
      response => { this._TodasAsAvaliacoes = response; this.updateData(); 
      this.hasConnection = (this._TodasAsAvaliacoes != null);}
    );//*/ 
      
    
  }
  public updateData(){

    //To refressh data.    
   
    this.avaliacaoService.findAll().subscribe(
      response => { 
        this._TodasAsAvaliacoes = response;  
      this.hasConnection = (this._TodasAsAvaliacoes != null);}
    );
    if(this._TodasAsAvaliacoes != null){
     
      var avAbertas  =  new Array();
      var avAgendadas=  new Array();

      for (  var i=0; i < this._TodasAsAvaliacoes.length; i++) // for acts as a foreach  
      {  
        if(this._TodasAsAvaliacoes[i].aberta){
          avAbertas.push(this._TodasAsAvaliacoes[i]);
        }else{
          avAgendadas.push(this._TodasAsAvaliacoes[i]);
        }
      } 
      //To make visible in all code
      this.avaliacaoService.opned    = avAbertas;
      this.avaliacaoService.schudule = avAgendadas;

      this._avaliacoesAbertas  = avAbertas;
      this._avaliacoesAgendadas= avAgendadas;
    }
    
  }
  
  public goTo(addres) {
    this.navCtrl.push(addres)
  }//*/
  public goToEvaluation(item: AvaliacaoDTO){
    
    this.navCtrl.push('EvaluationMenuPage',{avaliacao : item});       
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
    this.avaliacaoService.findscheduled().subscribe(
      response => { this._avaliacoesAgendadas = response }
    );
    const alert = this.alertCtrl.create({
      title: 'Titulo',
      subTitle: params,
      buttons: ['OK']
    });
    alert.present();

  }
}
