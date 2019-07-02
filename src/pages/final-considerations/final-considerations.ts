import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GeneralService } from './../../domain/general.service';
import { Component      } from '@angular/core';
import { AvaliacaoDTO   } from '../../model/avaliacao.dto';

@IonicPage()
@Component({
  selector: 'page-final-considerations',
  templateUrl: 'final-considerations.html',
})
export class FinalConsiderationsPage {
  public evaluation      : AvaliacaoDTO = this.navParams.get('avaliacao');
  public title : string;

  constructor(
    public navCtrl  : NavController, 
    public navParams: NavParams,
    public gservice : GeneralService ) {

  }

  ionViewDidLoad() {
    // if(this.evaluation == null){
    //   this.goback();
    // }else{
    //   this.title = this.gservice.nameAndDateToTitle(this.evaluation);
    // }

  }
  getCod(){
    if(this.evaluation != null)
      return this.evaluation.codigo;
    return "";
  }

  getEvaluationInformatios(){
    if(this.evaluation == null)
      return "";
    
    var output : string = "<br /><br />";

    output += "<b>Avaliador modificador: </b>" + this.evaluation.avaliadores[0].nome + "<br />";
    output += "<b>Curso: </b>"                 + this.evaluation.curso.nome   + "<br />";
    output += "<b>Nome: </b>"                  + this.evaluation.modelo.nome  + "<br />";
    output += "<b>Periodo: </b>"               + this.gservice.formatDate(this.evaluation.dataInicio) +" a " + this.gservice.formatDate(this.evaluation.dataTermino) + "<br />";
    output += "<b>Descrição: </b>"             + this.evaluation.modelo.descricao + "<br />";
    output += "<b>Campus: </b>"                + this.evaluation.campus.nome  + "<br />";
    output += "<b>Sigla: </b>"                 + this.evaluation.campus.sigla + "<br />";


    if(this.evaluation.conceito == null){
      output += "<b>Conceito: </b> Ainda não definido.<br />";
    }else{
      output += "<b>Conceito: </b>"  + this.evaluation.conceito + "<br />";
    }
    if(this.evaluation.parecer == null){
      output += "<b>Pareccer: </b> Ainda não definido.<br />";
    }else{
      output += "<b>Parecer: </b>"   + this.evaluation.parecer  + "<br />";
    }
    
    return output ;
  }


  goback(){
    if(this.navCtrl.length() > 1){
      //Previus page
      this.navCtrl.pop();
    }else{
      //Login page
      this.navCtrl.setRoot('LoginPage');
    }
  }
}
