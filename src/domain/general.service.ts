import { AlertController, Platform } from 'ionic-angular';
import { AvaliacaoDTO   } from './../model/avaliacao.dto';
import { Injectable     } from "@angular/core";

@Injectable()
export class GeneralService{
  static userName: string = "";

  constructor(
    public alertCtrl: AlertController,
    public platform        : Platform       
    ){

  }

  public showMessage(msg){  
    const alert = this.alertCtrl.create({
      title: 'Aviso',
      subTitle: msg,
      buttons: ['OK']
    });
    alert.present();
  }   
  
  //Used when is needed to show the date with a brazilian model.
  public formatDate(oldDate: string): string  {
    let newDate = oldDate.split("-");   
    return newDate[2]+ "/" + newDate[1] + "/" + newDate[0];
  }

  //Used to help to the build the title in some pages.
  public nameAndDateToTitle( evaluation: AvaliacaoDTO): string{
    let title = "Curso não atribuido - ";

    if(evaluation.curso != null){
      title = evaluation.curso.nome + "\n";
    }
    title += this.formatDate( evaluation.dataInicio) ;
    
    return (title.charAt(0).toUpperCase()) + title.toLowerCase().substr(1);
  }
  //
  couseName(evaluation: AvaliacaoDTO): string{
    return (evaluation.curso == null) ? "Nao atribuido." : evaluation.curso.nome;
  }

  pause(time : number){

    this.platform.ready().then(() => {      

      setInterval(() => {
        
      },time); 
    })
  }
}