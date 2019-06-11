import { AvaliacaoIndicatorDTO } from './../../model/avaliacaoIndicator.dto';
import { UserService     } from './../../domain/user.service';
import { GeneralService  } from './../../domain/general.service';
import { AvalicaoService } from './../../domain/avaliacao.service';
import { SeemPage        } from './../seem/seem';
import { Component       } from '@angular/core';
import { TabsPage        } from '../tabs/tabs';
import { IndicatorDTO    } from '../../model/indicator.dto';
import { AvaliacaoDTO    } from '../../model/avaliacao.dto';
import { IonicPage, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-indicator',
  templateUrl: 'indicator.html',
})
export class IndicatorPage {

  private btCheck    : number = 1;
  private btChecked  : number = 2;
  public evaluation  : AvaliacaoDTO = this.navParams.get('avaliacao');
  public title       : string = "";
  public label       : string = "";
  public observations: string = "";

  public itens    : IndicatorDTO[];
  public gridColor: string = "#cececf";

  public btSelected       : number = 1; 
  public selectedIdicator : number = 1;
  public selectedItem     : IndicatorDTO;

  public showObs : boolean = false;

  constructor(
    public navCtrl   : NavController, 
    public navParams : NavParams,
    public modalCtrl : ModalController,
    public avService : AvalicaoService,
    public alertCtrl : AlertController,
    public genService: GeneralService,
    public uService  : UserService) {
  }

  public showIndicator: boolean = false;

  presentProfileModal(args: string) {
    if(args.startsWith('SeemPage')){
      let profileModal = this.modalCtrl.create(SeemPage);
    }else{

    } 
    let profileModal = this.modalCtrl.create(args);
    profileModal.present();
  }
  
  public btGetColor(param: number): string{
    if(param == this.btSelected){
      return this.gridColor;
    }
    return "#ffffff";
  }
  public changeButton(param : number){
    this.btSelected = param;

    if(param == this.btCheck){
      this.gridColor = "#cececf";
    }else if(param == this.btChecked){
      this.gridColor = "#90ff91";
    }
  }
  goback(){
    if(this.navCtrl.length() > 1){
      this.navCtrl.popTo(TabsPage);
    }else{
      this.navCtrl.push(TabsPage);
    }
  }
  //Get of the evaluation
  updateIdicators(){
    if(this.evaluation == null)
      return;

    this.avService.getIndicatorByEvaluation(this.evaluation.codigo).subscribe(
      response => { 
        this.itens = response;
      } 
    ); 
  }
  changeSelection(num : number){
    this.selectedIdicator = num;
  }
  public hideTextfield(){
    this.showIndicator = true;
  }

  saveObservations(){
    if(this.avaIndicator != null){
      this.avaIndicator.parecer = this.observations;
      this.avService.updateObservationsIndicator(this.avaIndicator);
    }else{
      var data = <AvaliacaoIndicatorDTO> 
        {
        conceito: 1,
        parecer: this.observations,
        indicador: this.selectedItem,
        avaliacao: this.evaluation,
        usuario: this.uService.getUserLogged()
      };
      this.avService.saveItemIndicator(data).subscribe(
        response => { 
          console.log(response) 
        },
        (error) => {
          this.genService.showMessage('Erro ao salvar ' + error[0]);
          console.log(error); 

        } 
      ); 
    }
    this.hideObservation();
  }
  showRadio(i : IndicatorDTO) {
    let alert = this.alertCtrl.create();
    alert.setTitle('Selecione');

    // for(i.){
    //   alert.addInput({
    //     type: 'radio',
    //     label: 'Blue',
    //     value: 'blue'
    //   });

    // }
    alert.addInput({
      type: 'radio',
      label: 'Black',
      value: 'black'
    });

    alert.addInput({
      type: 'radio',
      label: 'Blue',
      value: 'black'
    });
   
    alert.addButton('Voltar');

    alert.addButton({
      text: 'Salvar',
      handler: data => {
       this.genService.showMessage(data);
      }
    });
    alert.present();
  }

  public avaIndicator : AvaliacaoIndicatorDTO;

  showObservation(i : IndicatorDTO){   
    this.observations = "";

    this.avService.getAvaIndicator(i.codigo, this.evaluation.codigo).subscribe(
      response => { 
        if(response != null){
          this.observations = response.parecer;
          this.avaIndicator = response;
        }
        //this.genService.showMessage(response.parecer);
      } 
    );        
    this.showObs = true;
    this.selectedItem = i;
    this.label = i.nome;
  }
  hideObservation(){
    this.showObs = false;
  }
  ionViewDidLoad() {
    
    this.updateIdicators();
    
    if(this.evaluation != null){
      this.title = this.genService.nameAndDateToTitle(this.evaluation);
    }      
  }
}
