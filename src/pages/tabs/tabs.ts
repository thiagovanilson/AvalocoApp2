import { EvaluationPage } from './../evaluation/evaluation';
import { NavController, NavParams } from 'ionic-angular';
import { Component } from '@angular/core';

//import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage    } from '../home/home';
import { UserPage    } from '../user/user';
import { AvaliacaoDTO} from '../../model/avaliacao.dto';
import { API_CONFIG  } from '../../config/api.config';
import { LoginPage   } from '../login/login';
import { AvalicaoService       } from '../../domain/avaliacao.service';
import { ClosedEvaluationsPage } from '../closed-evaluations/closed-evaluations';

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
    title: "Avaliações Agendadas"
  };
  paramsOpned = {
    title: "Avaliações Abertas"
  };
  paramsDone = {
    title: "Avaliações Finalizadas"
  };

  qtdOpned      = "";
  qtdScreduled  = "";

  public _avaliacoesAbertas  : AvaliacaoDTO[];
  public _avaliacoesAgendadas: AvaliacaoDTO[];

  constructor(     
    public avaliacaoService: AvalicaoService,
    public navCtrl: NavController, 
    public params: NavParams) {

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
     
      this.avaliacaoService.findscheduled().subscribe(
        response => { 
          this._avaliacoesAgendadas = response;

          if(this._avaliacoesAgendadas.length > 0)
            this.qtdScreduled =this._avaliacoesAgendadas.length + "";
          else
            this.qtdScreduled = "";
        }
      );
      this.avaliacaoService.findOpened().subscribe(
        response => { 
          this._avaliacoesAbertas = response;

          if(this._avaliacoesAbertas.length > 0)
            this.qtdOpned = this._avaliacoesAbertas.length + "";
          else
            this.qtdOpned = "";
        }
      );
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
