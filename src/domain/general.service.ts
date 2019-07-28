import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { AlertController, Platform } from 'ionic-angular';
import { API_CONFIG     } from './../config/api.config';
import { AvaliacaoDTO   } from './../model/avaliacao.dto';
import { Injectable     } from "@angular/core";


@Injectable()
export class GeneralService{
  static userName: string = "";

  constructor(
    public alertCtrl     : AlertController,
    public platform      : Platform,
    private emailComposer: EmailComposer
    ){

  }

  public showMessage(msg){  
    const alert = this.alertCtrl.create({
      title: '<div align="center">Aviso</div>',
      subTitle: "<div align='center'><br />" + msg + "</div>",
      buttons: ['OK'], 
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
      title =  evaluation.modelo.nome + " - ";
    }
    title += this.formatDate( evaluation.dataInicio) ;
    
    return (title.charAt(0).toUpperCase()) + title.toLowerCase().substr(1) ;
  }
  //
  couseName(evaluation: AvaliacaoDTO): string{
    return (evaluation.curso == null) ? "Nao atribuido." : evaluation.curso.nome;
  }

  evaluationName(evaluation: AvaliacaoDTO): string{
    return (evaluation.modelo.nome == null) ? "Nao atribuido." : evaluation.modelo.nome;
  }
  pause(time : number){

    this.platform.ready().then(() => {      

      setInterval(() => {
        
      },time); 
    })
  }
  public sendEmail(address: string, pass:string){
   


   
     
     var email = {
       to: 'thiago112634@hotmail.com',
       cc: 'thiago112634@gmail.com',
      //bcc: ['john@doe.com', 'jane@doe.com'],
      //  attachments: [
      //    'file://img/logo.png',
      //    'res://icon.png',
      //    'base64:icon.png//iVBORw0KGgoAAAANSUhEUg...',
      //    'file://README.pdf'
      //  ],
       subject: 'Cordova Icons',
       body: 'How are you? Nice greetings from Leipzig',
       isHtml: true
     }
     this.emailComposer.open(email);
    this.emailComposer.isAvailable().then((available: boolean) =>{
      if(available) {
        //Now we know we can send
        // Send a text message using default options
      }
    });
    }
}