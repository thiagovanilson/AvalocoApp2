import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { TabsPage } from '../tabs/tabs';

/**
 * Generated class for the ChecklistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-checklist',
  templateUrl: 'checklist.html',
})
export class ChecklistPage {

  constructor(public actionSheetCtrl: ActionSheetController, public navCtrl: NavController, public navParams: NavParams) {
  }
  title: string = "Vanilson";
  ionViewDidLoad() {
    console.log('ionViewDidLoad ChecklistPage');
  }
  goToHome(){
    this.navCtrl.push(HomePage);
  }
  categorySelected:string = "Documentos no âmbito da instituicão"
  presentActionSheet() {
    
    const actionSheet = this.actionSheetCtrl.create({
      //title: 'Categoria',
      buttons: [
        {
          text: 'Documentos no âmbito da instituicão',
          role: 'ambientes',
          handler: () => {
            this.categorySelected= "Documentos no âmbito da instituicão";
          }
        },{
          text: 'Exemplo2',
          role: 'ambientes',
          handler: () => {
            this.categorySelected= "Exemplo2";
          }
        },{
          text: 'Exemplo3',
          role: 'ambientes',
          handler: () => {
            this.categorySelected= "Exemplo3";
          }
        },{
          text: 'Cancelar',
          
        }
      ]
    });
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

