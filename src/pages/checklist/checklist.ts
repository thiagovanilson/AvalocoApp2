import { UserService } from './../../domain/user.service';
import { Component, ErrorHandler } from '@angular/core';
import { AvaliacaoChecklistDTO } from './../../model/avaliacaoChecklist.dto';
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
      this.navCtrl.setRoot(TabsPage);      
    }else{
      this.avService.getChecklistCategory(this.evaluation.codigo).subscribe(
        response => { 
          this.categories = response; 
          this.firstCategory = this.categories[0].nome; 
        } 
      );  
      this.title = this.gservice.nameAndDateToTitle(this.evaluation);
      this.avService.getItensByCategory(this.categorySelectedCod).subscribe(
        response => { this.itens = response;  } 
      ); 
      this.loadItens();
    }
  }
  loadItens(){

    this.avService.getItensByCategory(this.categorySelectedCod).subscribe(
      response => {
        this.itens = response; 
      } 
    );

    this.updateItensValues();
  }
  
  updateItensValues(){
   
    if(this.itens != null){
      
      for(let cont = 0; cont < this.itens.length; cont++){
        try{
       
          this.avService.getItemCheckList(this.itens[cont].codigo,this.evaluation.codigo).subscribe(
            response => {
              this.itens[cont].atendido = -1;
              
              if(response != null /*&& this.itens[cont].codigo == response.itemCheck.codigo*/){
                
                if(response.atendido == true){
                  this.itens[cont].atendido = 1;
                }else if(response.atendido == false){
                  this.itens[cont].atendido = 0;
                }
              }              
            }
          );
        }catch(ErrorHandler){
          
        }//End Try.      
      }//End for.
    }//End IF.
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

  private showTextfield(item : ChecklistItemDTO){
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
  private saveObservation(){
    this.showIndicators = true;
    // var atendido : Boolean = false;

    if(this.itemEvaluated != null){
      this.itemEvaluated.observacao = this.observations;
      this.avService.updateObservations(this.itemEvaluated);
    }else{
      var data = <AvaliacaoChecklistDTO> 
      <unknown>{
        //atendido  : undefined,
        observacao: this.observations,
        avaliacao: {
          codigo: this.evaluation.codigo
        },
        itemCheck: {
          codigo: this.itemSelected.codigo
        },
        avaliador: this.uService.getUserLogged()
      };
      
      //this.avService.saveObservatios(data);
      this.avService.saveItemCheckList(data).subscribe(
        response => { 
          console.log(response) 
        },
        (error) => {
          this.gservice.showMessage('Erro ao salvar ' + error[0]);
        } 
      ); 
    }   
  }
  saveItemCheckllist(check : ChecklistItemDTO){
    //First step just to converter the atribute and preparete the object to send.
    var atendido : Boolean = false;

    if(check.atendido == 1){
      atendido = true;
    }


    var data = <AvaliacaoChecklistDTO> 
    <unknown>{
      atendido: atendido,
      observacao: '',
      avaliacao: {
        codigo: this.evaluation.codigo
      },
      itemCheck: {
        codigo: check.codigo
      },
      avaliador: this.uService.getUserLogged()
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
    this.navCtrl.push(HomePage);
  }
  public  actionSheet : ActionSheet;  
  
  alterStatus(check : ChecklistItemDTO, status: boolean){

    if(status == true){
      check.atendido = 1 ;
    }else{
      check.atendido = 0;
    }
    this.avService.getItemCheckList(check.codigo, this.evaluation.codigo).subscribe(
      response => { 
        if(response != null){
          response.atendido = status;
          this.avService.updateObservations(response);
          // this.saveItemCheckllist(check)

        }else{
          this.saveItemCheckllist(check)
        }
      } ,
      (error) => {
        this.gservice.showMessage('Erro ao salvar');
      } 
    ); 
    this.updateItensValues();
    //this.validadeItem(check, status);
  }
  showObservation(){
    this.showObs = true;
  }
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

