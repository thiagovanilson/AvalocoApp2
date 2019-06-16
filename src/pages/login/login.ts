import { NavController, IonicPage } from 'ionic-angular';
import { GeneralService } from './../../domain/general.service';
import { Component      } from '@angular/core';
import { UserDTO        } from '../../model/user.dto';
import { TabsPage       } from '../tabs/tabs';
import { UserService    } from '../../domain/user.service';

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
  

  goToHome(){
    
    if(this.userName == ""){
      this.genService.showMessage("Login é obrigatorio");
      return;
    }
    if(this.pass == ""){
      this.genService.showMessage("Senha é obrigatoria");
      return;
    }    
    
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
      },
      (error) => {
        this.genService.showMessage("Erro na rede!<br />Verifique sua conexão com a internet.");
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
