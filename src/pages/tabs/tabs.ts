import { EvaluationPage } from './../evaluation/evaluation';
import { NavController, NavParams } from 'ionic-angular';
import { Component } from '@angular/core';

//import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { UserPage } from '../user/user';
import { AvaliacaoDTO } from '../../model/avaliacao.dto';
import { AvalicaoService } from '../../domain/avaliacao.service';
import { ClosedEvaluationsPage } from '../closed-evaluations/closed-evaluations';
import { API_CONFIG } from '../../config/api.config';

//https://javiergarciaescobedo.es/ionic/479-navegacion-entre-paginas-en-ionic

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = EvaluationPage;
  tab3Root = EvaluationPage;
  tab4Root = ClosedEvaluationsPage;
  tab5Root = UserPage;

 
  paramsSchedule = {
    title: "Avaliações agendadas"
  };
  paramsOpned = {
    title: "Avaliações Abertas"
  };
  paramsDone = {
    title: "Avaliações finalizadas"
  };

  qtdOpned      = "";
  qtdScreduled  = "";

  public _avaliacoesAbertas  : AvaliacaoDTO[];
  public _avaliacoesAgendadas: AvaliacaoDTO[];
  private _TodasAsAvaliacoes : AvaliacaoDTO[]; 

  public get avaliacoesAbertas(): AvaliacaoDTO[] {
    return this._avaliacoesAbertas;
  }

  public get avaliacoesAgendadas(): AvaliacaoDTO[] {
    return this._avaliacoesAgendadas;
  }

  ionViewDidLoad() {
   
    this.avaliacaoService.findAll().subscribe(
      response => { this._TodasAsAvaliacoes = response; this.updateData(); }
    );//*/
    
    
  }
  getColor(){
    return API_CONFIG.buttonColor;
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
      this._avaliacoesAbertas  = avAbertas;
      this._avaliacoesAgendadas= avAgendadas;

      if(avAbertas.length > 0)
        this.qtdOpned = avAbertas.length + "";
      else
        this.qtdOpned = "";
      
      if(avAgendadas.length > 0)
        this.qtdScreduled = avAgendadas.length + "";
      else
        this.qtdScreduled = "";

    }
  }
  constructor(     
    public avaliacaoService: AvalicaoService,
    public navCtrl: NavController, 
    public params: NavParams) {

  }
  //Best way to not use the menu bar
  goToUser(){
    this.navCtrl.push(UserPage, );
  }
  goToSchudule(){
    this.navCtrl.setRoot(EvaluationPage, this.paramsSchedule );
  }
  goToFinished(){
    this.navCtrl.setRoot(EvaluationPage, this.paramsDone );
  }
}
