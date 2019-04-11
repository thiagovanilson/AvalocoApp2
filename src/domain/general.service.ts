import { AvaliacaoDTO } from './../model/avaliacao.dto';
import { AlertController } from 'ionic-angular';
import { Injectable   } from "@angular/core";

@Injectable()
export class GeneralService{
  static userName: string = "";

  constructor(public alertCtrl: AlertController){

  }

  public showMessage(msg){
  
    const alert = this.alertCtrl.create({
      title: 'Titulo',
      subTitle: msg,
      buttons: ['OK']
    });
    alert.present();
  }
   
  //newDate: string[];

  public formatDate(oldDate: string): string  {
    let newDate = oldDate.split("-");   
    return newDate[2]+ "/" + newDate[1] + "/" + newDate[0];
  }
  public nameAndDateToTitle( evaluation: AvaliacaoDTO): string{
    let title  = evaluation.curso.nome + "\n";
    title += this.formatDate( evaluation.dataInicio) ;
    return title;
  }
}