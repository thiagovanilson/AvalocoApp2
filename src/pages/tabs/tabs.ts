import { UserService } from './../../domain/user.service';
import { EvaluationPage } from './../evaluation/evaluation';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { Component } from '@angular/core';


import { HomePage    } from '../home/home';
import { UserPage    } from '../user/user';
import { AvaliacaoDTO} from '../../model/avaliacao.dto';
import { API_CONFIG  } from '../../config/api.config';
import { LoginPage   } from '../login/login';
import { AvalicaoService       } from '../../domain/avaliacao.service';

//https://javiergarciaescobedo.es/ionic/479-navegacion-entre-paginas-en-ionic

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = EvaluationPage;
  tab3Root = EvaluationPage;
  tab4Root = EvaluationPage;
  tab5Root = UserPage;
 
  paramsSchedule = {
    title: "Avaliações Agendadas"
  };
  paramsOpned = {
    title: "Avaliações Abertas"
  };
  paramsDone = {
    title: "Avaliações Finalizadas"
  };

  qtdOpned      = "";
  qtdScheduled  = "";
  qtdDone       = "";

  public _avaliacoesAbertas  : AvaliacaoDTO[];
  public _avaliacoesAgendadas: AvaliacaoDTO[];

  constructor(     
    public avaliacaoService: AvalicaoService,
    public navCtrl: NavController, 
    public params: NavParams,
    public uService: UserService,
    public platform: Platform) {

      platform.ready().then(() => {      

        setInterval(() => {
        //console.log("Espera " + this.cont++ )
          this.updateData();
          
        },1000); 
      }) //*/

  }

  public get avaliacoesAbertas(): AvaliacaoDTO[] {
    return this._avaliacoesAbertas;
  }

  public get avaliacoesAgendadas(): AvaliacaoDTO[] {
    return this._avaliacoesAgendadas;
  }

  ionViewDidLoad() {   
    this.updateData();          
  }
  getColor(){
    return API_CONFIG.buttonColor;
  }
  private updateData(){
    
    if(this.uService.getUserLogged() != null){
      
      if(this.avaliacaoService.qtdScheduled > 0)
        this.qtdScheduled = this.avaliacaoService.qtdScheduled + "";
      else
        this.qtdScheduled = "";

      if(this.avaliacaoService.qtdOpned > 0)
        this.qtdOpned =this.avaliacaoService.qtdOpned + "";
      else
        this.qtdOpned = "";

      if(this.avaliacaoService.qtdDone > 0)
        this.qtdDone =this.avaliacaoService.qtdDone + "";
      else
        this.qtdDone = "";
      // this.avaliacaoService.findscheduled(this.uService.getUserLogged().codigo).subscribe(
      //   response => { 
      //     this._avaliacoesAgendadas = response;

      //   }
      // );
      // this.avaliacaoService.findOpened(this.uService.getUserLogged().codigo).subscribe(
      //   response => { 
      //     this._avaliacoesAbertas = response;

      //     if(this._avaliacoesAbertas.length > 0)
      //       this.qtdOpned = this._avaliacoesAbertas.length + "";
      //     else
      //       this.qtdOpned = "";
      //   }
      // );
      // this.avaliacaoService.findsDone(this.uService.getUserLogged().codigo).subscribe(
      //   response => { 

      //     if(response != null && response.length > 0)
      //       this.qtdDone = response.length + "";
      //     else
      //       this.qtdDone = "";
      //   }
      // );
    }
  }
  
  isLogged(){
    this.navCtrl.push(LoginPage );
  }
  //Best way to not use the menu bar
  goToUser(){
    this.navCtrl.push(UserPage, );
  }
  //Pages with menu this bar
  goToSchudule(){
    this.navCtrl.setRoot(EvaluationPage, this.paramsSchedule );
  }
  goToFinished(){
    this.navCtrl.setRoot(EvaluationPage, this.paramsDone );
  }
}
