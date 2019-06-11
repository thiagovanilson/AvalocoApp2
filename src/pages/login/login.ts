import { AvalicaoService } from './../../domain/avaliacao.service';
import { GeneralService } from './../../domain/general.service';

import { NavController, IonicPage } from 'ionic-angular';
import { Component} from '@angular/core';
import { UserDTO  } from '../../model/user.dto';
import { TabsPage } from '../tabs/tabs';
import { UserService } from '../../domain/user.service';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
  
})
export class LoginPage {

  constructor( 
    public navCtrl   : NavController, 
    public user      : UserDTO,
    public genService: GeneralService,
    public uService  : UserService) {

  }
  pass    : string = "";
  userName: string = "";
  

  goToHome(params){
    
    if(this.userName == ""){
      alert("Login é obrigatorio");
      return;
    }
    if(this.pass == ""){
      alert("Senha é obrigatoria");
      return;
    }
    //UserName ignored just for test page user.
    
    
    this.uService.getUserByLogin(this.userName).subscribe(
      response => { 
        if(response != null && this.pass == response.senha){
          
          if(response.tipo != "AVALIADOR"){
            this.genService.showMessage("Este usuario não tem permição de acesso!");      

          }else{

            this.uService.setUserLogged(response);
            UserService.setUserName(response.nome);
            this.navCtrl.setRoot(TabsPage);
          }
          
        }else{
          this.genService.showMessage("Usuario ou senha incorretos!");      
        }    
      } 
    );       
  }
  ionViewDidLoad(){  
    /*if(this.isLogged()){
      this.navCtrl.setRoot(HomePage);
    }//*/
  }
  //Temporary
  public isLogged (){
    return false;
  }
}
