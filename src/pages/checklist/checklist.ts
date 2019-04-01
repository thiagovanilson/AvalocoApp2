import { AvaliacaoDTO    } from './../../model/avaliacao.dto';
import { ChecklistItemDTO} from './../../model/checklistItem.dto';
import { AvalicaoService } from './../../domain/avaliacao.service';
import { Component       } from '@angular/core';
import { HomePage        } from '../home/home';
import { TabsPage        } from '../tabs/tabs';
import { ItemCategoryDTO } from '../../model/itemCategory.dto';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-checklist',
  templateUrl: 'checklist.html',
})
export class ChecklistPage {

  public categories : ItemCategoryDTO[];
  public itens      : ChecklistItemDTO[];
  public evaluation : AvaliacaoDTO = this.navParams.get('avaliacao');

  constructor(public actionSheetCtrl: ActionSheetController, 
    public navCtrl: NavController, 
    public navParams: NavParams,
    public avService: AvalicaoService) {
  }
  title: string = "Vanilson";

  ionViewDidLoad() {
    this.avService.getChecklistCategory(this.evaluation.codigo).subscribe(
      response => { this.categories = response;  } 
    );  
    this.avService.getItensByCategory(1).subscribe(
      response => { this.itens = response;  } 
    );  
  }
  goToHome(){
    this.navCtrl.push(HomePage);
  }
  categorySelected:string = "Documentos no âmbito da instituicão";

  presentActionSheet() {
    
    
    const actionSheet = this.actionSheetCtrl.create({
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
    actionSheet.present();
  }
  goback(){
    if(this.navCtrl.length() > 1){
      this.navCtrl.popTo(TabsPage);
    }else{
      this.navCtrl.push(TabsPage);
    }
  }
}

