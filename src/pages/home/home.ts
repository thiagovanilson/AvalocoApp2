import { Component, Injectable } from '@angular/core';
import { NavController, AlertController, ModalController } from 'ionic-angular';
import { AvalicaoService } from '../../domain/avaliacao.service';
import { AvaliacaoDTO } from '../../model/avaliacao.dto';
import { API_CONFIG } from '../../config/api.config';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
@Injectable()
export class HomePage {

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public avaliacaoService: AvalicaoService,
    public modalCtrl: ModalController) {
      
  }
  goToHome(params) {
    //this.navCtrl.push(LoginPage);
    //alert("This is my warning message " );
  }
  
  public _avaliacoesAbertas  : AvaliacaoDTO[];
  public _avaliacoesAgendadas: AvaliacaoDTO[];
  private _TodasAsAvaliacoes : AvaliacaoDTO[]; 

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
    
    this.avaliacaoService.findAll().subscribe(
      response => { this._TodasAsAvaliacoes = response; this.updateData(); }
    );//*/
    
    
  }
  private updateData(){
    
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
      this.avaliacaoService.opned = avAbertas;
      this._avaliacoesAbertas = avAbertas;
      this._avaliacoesAgendadas= avAgendadas;
    }
  }
  public goTo(addres) {
    this.navCtrl.push(addres)
  }//*/

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
