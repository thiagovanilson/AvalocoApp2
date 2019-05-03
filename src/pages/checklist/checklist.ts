import { Component, ErrorHandler } from '@angular/core';
import { AvaliacaoChecklisDTO } from './../../model/avaliacaoChecklist.dto';
import { ItemCategoryDTO } from './../../model/itemCategory.dto';
import { GeneralService  } from './../../domain/general.service';
import { AvaliacaoDTO    } from './../../model/avaliacao.dto';
import { ChecklistItemDTO} from './../../model/checklistItem.dto';
import { AvalicaoService } from './../../domain/avaliacao.service';
import { HomePage        } from '../home/home';
import { TabsPage        } from '../tabs/tabs';

import { IonicPage, NavController, NavParams, ActionSheetController, ActionSheet } from 'ionic-angular';

@IonicPage()
@Component({
  selector   : 'page-checklist',
  templateUrl: 'checklist.html',
})
export class ChecklistPage {

  public categories      : ItemCategoryDTO[];
  public selectedCategory: ItemCategoryDTO;  
  public itens           : ChecklistItemDTO[];
  public itensResponse   : AvaliacaoChecklisDTO[];
  public evaluation      : AvaliacaoDTO = this.navParams.get('avaliacao');
  public firstCategory   : string;
  public title           : string;

  public categorySelectedName: string = "Documentos no âmbito da instituicão";
  public categorySelectedCod : number;

  constructor(public actionSheetCtrl: ActionSheetController, 
    public navCtrl  : NavController, 
    public navParams: NavParams,
    public avService: AvalicaoService,
    public gservice : GeneralService) {
  }
 
  ionViewDidLoad() {

    if(this.evaluation != null){
      
      this.avService.getChecklistCategory(this.evaluation.codigo).subscribe(
        response => { 
          this.categories = response; 
          this.firstCategory = this.categories[0].nome; 
        } 
      );  
      this.title = this.gservice.nameAndDateToTitle(this.evaluation);
    }
    this.avService.getItensByCategory(this.categorySelectedCod).subscribe(
      response => { this.itens = response;  } 
    ); 
    this.loadItens();
  }
  loadItens(){
    //this.gservice.showMessage(this.categorySelectedCod);

    this.avService.getItensByCategory(this.categorySelectedCod).subscribe(
      response => {
        this.itens = response;         
      } 
    );

    this.updateItensValues();
  }
  public out : string = "" ;
  updateItensValues(){
    if(this.itens != null && this.itens != []){
      
      for(let cont = 0; cont < this.itens.length; cont++){
        try{

          this.avService.getItemCheckList(this.itens[cont].codigo,this.evaluation.codigo).subscribe(
          response => {
            
            if(response != null /*&& this.itens[cont].codigo == response.itemCheck.codigo*/){
              //let a : ChecklistItemDTO;
              //this.gservice.showMessage(response.atendido);
              this.itens[cont].atendido = response.atendido;
              this.out +=  this.itens[cont].atendido + "\n";
            }
          }
          );
        }catch(ErrorHandler){
          
        }      
      }
      //this.gservice.showMessage(this.out);
    }
  } 
  
  goToHome(){
    this.navCtrl.push(HomePage);
  }
  public  actionSheet : ActionSheet;  
  
  alterStatus(check : ChecklistItemDTO, status: boolean){
    check.atendido = <boolean>status ;
    this.saveItemCheckllist(check);
  }
  saveItemCheckllist(check : ChecklistItemDTO){
    var data = <AvaliacaoChecklisDTO> 
    { 
        atendido : <boolean>check.atendido,
        observacao: '',
        avaliacao :
        {
          codigo : this.evaluation.codigo
        },
        itemCheck:{
          codigo : check.codigo
        }
      }
      ;
      //this.gservice.showMessage(data.atendido);
    this.avService.saveItemCheckList(data).subscribe(
      response => { console.log(response) } 
    );  

    //this.gservice.showMessage( "atendido: " + this.itens[0].atendido );
    //this.itens[0].atendido = false;
  }
  goback(){
    if(this.navCtrl.length() > 1){
      this.navCtrl.popTo(TabsPage);
    }else{
      this.navCtrl.push(TabsPage);
    }
  }
}

