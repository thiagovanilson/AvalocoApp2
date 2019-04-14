import { AvaliacaoChecklisDTO } from './../../model/avaliacaoChecklist.dto';
import { GeneralService  } from './../../domain/general.service';
import { AvaliacaoDTO    } from './../../model/avaliacao.dto';
import { ChecklistItemDTO} from './../../model/checklistItem.dto';
import { AvalicaoService } from './../../domain/avaliacao.service';
import { Component       } from '@angular/core';
import { HomePage        } from '../home/home';
import { TabsPage        } from '../tabs/tabs';
import { ItemCategoryDTO } from '../../model/itemCategory.dto';
import { IonicPage, NavController, NavParams, ActionSheetController, ActionSheet } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-checklist',
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

  constructor(public actionSheetCtrl: ActionSheetController, 
    public navCtrl  : NavController, 
    public navParams: NavParams,
    public avService: AvalicaoService,
    public gservice : GeneralService) {
  }

  ionViewDidLoad() {
    if(this.evaluation == null){
      return;
    }
    
    this.avService.getChecklistCategory(this.evaluation.codigo).subscribe(
      response => { this.categories = response; this.firstCategory = this.categories[0].nome; } 
    );  
    this.avService.getItensByCategory(this.evaluation.codigo).subscribe(
      response => { this.itens = response;  } 
    ); 
    this.title = this.gservice.nameAndDateToTitle(this.evaluation);
    
  }
  goToHome(){
    this.navCtrl.push(HomePage);
  }
  categorySelected:string = "Documentos no âmbito da instituicão";
  public  actionSheet : ActionSheet;
  
  presentActionSheet() {
    
    
    this.actionSheet = this.actionSheetCtrl.create({
      //title: 'Categoria',
      buttons: [
        {
          text: this.categories[0].nome +'',
          role: 'ambientes',
          handler: () => {
            this.categorySelected= this.categories[0].nome +'';
          }
        },{
          text: 'Cancelar',
          
        }
      ]
    });
   /* const actionSheet2 = this.actionSheetCtrl.create({
      //title: 'Categoria',
      buttons: [
        {
          text: this.itens[1].nome +'',
          role: 'ambientes',
          handler: () => {
            this.categorySelected= "Exemplo2";
          }
        },{
          text: 'Cancelar',
          
        }
      ]
    });//*/
    this.actionSheet.showBackButton;
    this.actionSheet.present();
  }
  alterStatus(check : ChecklistItemDTO, status: boolean){
    check.atendido = status ;
  }
  saveItemCheckllist(check : AvaliacaoChecklisDTO){

    this.avService.saveItemCheckList(check).subscribe(
      response => {  } 
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

