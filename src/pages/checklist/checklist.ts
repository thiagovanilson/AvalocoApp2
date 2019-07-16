import { UserService } from './../../domain/user.service';
import { AvaliacaoChecklistDTO } from './../../model/avaliacaoChecklist.dto';
import { Component       } from '@angular/core';
import { ItemCategoryDTO } from './../../model/itemCategory.dto';
import { GeneralService  } from './../../domain/general.service';
import { AvaliacaoDTO    } from './../../model/avaliacao.dto';
import { ChecklistItemDTO} from './../../model/checklistItem.dto';
import { AvalicaoService } from './../../domain/avaliacao.service';
import { HomePage        } from '../home/home';
import { TabsPage        } from '../tabs/tabs';

import { IonicPage, NavController, NavParams, ActionSheetController, ActionSheet, AlertController,  Platform } from 'ionic-angular';

@IonicPage()
@Component({
  selector   : 'page-checklist',
  templateUrl: 'checklist.html',
})
export class ChecklistPage {

  public categories      : ItemCategoryDTO[];
  public selectedCategory: ItemCategoryDTO;  
  public itens           : ChecklistItemDTO[];
  public itensResponse   : AvaliacaoChecklistDTO[];
  public evaluation      : AvaliacaoDTO = this.navParams.get('avaliacao');
  public firstCategory   : string;
  public title           : string;

  public categorySelectedName: string = "Documentos no âmbito da instituicão";
  public categorySelectedCod : number = 1;
  public itemSelected        : ChecklistItemDTO;
  public showObs :boolean;
  
  constructor(public actionSheetCtrl: ActionSheetController, 
    public navCtrl  : NavController, 
    public navParams: NavParams,
    public platform : Platform ,
    public avService: AvalicaoService,
    public gservice : GeneralService,
    public uService : UserService,
    public alertCtrl: AlertController) {

      platform.ready().then(() => {      

        setInterval(() => {
        
          this.updateItensValues();
        },1000);  
      }) //
  }
 
  ionViewDidLoad() {

    //Used to protect the system of values nullables.
    if(this.evaluation == null){
      this.navCtrl.setRoot("LoginPage");      
    }else{
      this.avService.getChecklistCategory(this.evaluation.codigo).subscribe(
        response => { 
          if(response != null){
            this.categories = response; 
            this.firstCategory = this.categories[0].nome; 
            this.categorySelectedCod = response[0].codigo;
          }
        } 
      );  
      
      this.title = this.gservice.nameAndDateToTitle(this.evaluation) ;
      
      this.loadItens();
    }
  }

  loadItens(){

    this.avService.getItensByCategory(this.categorySelectedCod).subscribe(
      response => {
        this.itens = response; 
        this.updateItensValues();
      } 
    );

  }
  
  updateItensValues(){   
      
    try{
      if(this.itens == null )
        return;
        
      for(let cont = 0; cont < this.itens.length; cont++){
        if(this.itens[cont] != null){
          
          this.avService.getItemCheckList(this.itens[cont].codigo,this.evaluation.codigo).subscribe(
            response => {
              this.itens[cont].atendido = -1;
              
              if(response != null ){
                if(response.atendido == true){
                  this.itens[cont].atendido = 1;
                }else if(response.atendido == false){
                  this.itens[cont].atendido = 0;
                }
              }              
            }
          );
        }
      }//End for.
    }catch(ErrorHandler){
      
    }//End Try.      
  }//End function. 

  validadeItem(item: ChecklistItemDTO, wanted: boolean): boolean{
    if(item.atendido == 0 || item.atendido == 1){
      if(wanted && item.atendido == 1){
        return true;
      }else if(!wanted && item.atendido == 0){
        return true;
      }
    }
    return false;
  }

  public  showIndicators : boolean = true;
  public label          : string;
  public  observations   : string = "";
  public itemEvaluated   : AvaliacaoChecklistDTO = null;

  public showTextfield(item : ChecklistItemDTO){
    this.itemSelected = item; 
    this.showIndicators = false;

    this.avService.getItemCheckList(this.itemSelected.codigo, this.evaluation.codigo).subscribe(
      response => { 
        this.itemEvaluated = response;
        this.observations  = "";

        if(this.itemEvaluated != null)
          this.observations   = this.itemEvaluated.observacao;

        this.label          = item.nome;
        this.itemSelected   = item;
      } 
    );        
  }
  public hideTextfield(){
    this.showIndicators = true;
  }
  public saveObservation(){
    this.hideTextfield();

    if(this.evaluation.dataEntrega != null){
      this.gservice.showMessage("Esta avaliação já esta encerrada.<br />Os dados não serão alterados. ");
      return;
    }
    // var atendido : Boolean = false;
    if(this.uService.getUserLogged().codigo != this.evaluation.avaliadorModificador.codigo){
      this.gservice.showMessage('Esse avaliador não tem permissão para alterar!<br/>As altrações não serão salvas.');
      return;
    }
    if(this.itemEvaluated != null){
      this.itemEvaluated.observacao = this.observations;
      this.avService.updateObservations(this.itemEvaluated);
    }else{
      var data = <AvaliacaoChecklistDTO> 
      {
        observacao: this.observations,
        avaliacao: {
          codigo: this.evaluation.codigo
        },
        itemCheck: {
          codigo: this.itemSelected.codigo
        },
        usuario: this.uService.getUserLogged()
      };
      
      this.avService.saveItemCheckList(data).subscribe(
        response => { 
          console.log(response) 
        },
        (error) => {
          this.gservice.showMessage('Erro ao salvar ');
        } 
      ); 
    }   
  }
  saveItemCheckllist(check : ChecklistItemDTO){
    if(this.uService.getUserLogged().codigo != this.evaluation.avaliadorModificador.codigo){
      this.gservice.showMessage('Esse avaliador não tem permissão para alterar!<br/>As altrações não serão salvas.');
      return;
    }
    
    //First step just to converter the atribute and preparete the object to send.
    var atendido : Boolean = false;

    if(check.atendido == 1){
      atendido = true;
    }


    var data = <AvaliacaoChecklistDTO> 
    {
      atendido: atendido,
      avaliacao: {
        codigo: this.evaluation.codigo
      },
      itemCheck: {
        codigo: check.codigo
      },
      usuario: this.uService.getUserLogged()
    };
      //this.gservice.showMessage(data.atendido);
    this.avService.saveItemCheckList(data).subscribe(
      response => { console.log(response) } ,
      (error) => {
        this.gservice.showMessage('Erro ao salvar');
      } 
    );  
    //this.gservice.showMessage( "atendido: " + this.itens[0].atendido );
    //this.itens[0].atendido = false;
  }
 
  goToHome(){
    this.navCtrl.setRoot(HomePage);
  }
  public  actionSheet : ActionSheet;  
  
  alterStatus(check : ChecklistItemDTO, status: boolean){
    if(this.uService.getUserLogged().codigo != this.evaluation.avaliadorModificador.codigo){
      this.gservice.showMessage('Esse avaliador não tem permissão para alterar!<br/>As altrações não serão salvas.');
      return;
    }
    
    if(status == true){
      check.atendido = 1 ;
    }else{
      check.atendido = 0;
    }
    
    if(this.evaluation.dataEntrega != null){
      this.gservice.showMessage("Esta avaliação já esta encerrada.<br />Os dados não serão alterados. ");
      return;
    }
    this.avService.getItemCheckList(check.codigo, this.evaluation.codigo).subscribe(
      response => { 
        if(response != null){
          response.atendido = status;
          this.avService.updateObservations(response);

        }else{
          this.saveItemCheckllist(check)
        }
      } ,
      (error) => {
        this.gservice.showMessage('Erro ao salvar');
      } 
    ); 
  }
  // showObservation(){
  //   this.showObs = true;
  // }
  hideObservation(){
    this.showObs = false;
  }
  
  goback(){
    if(this.navCtrl.length() > 1){
      this.navCtrl.popTo(TabsPage);
    }else{
      this.navCtrl.push(TabsPage);
    }
  }
}

