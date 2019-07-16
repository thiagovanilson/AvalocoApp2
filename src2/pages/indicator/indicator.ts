import { ConceptDTO } from './../../model/concept.dto';
import { AvaliacaoIndicatorDTO } from './../../model/avaliacaoIndicator.dto';
import { UserService     } from './../../domain/user.service';
import { GeneralService  } from './../../domain/general.service';
import { AvalicaoService } from './../../domain/avaliacao.service';
import { Component       } from '@angular/core';
import { TabsPage        } from '../tabs/tabs';
import { IndicatorDTO    } from '../../model/indicator.dto';
import { AvaliacaoDTO    } from '../../model/avaliacao.dto';
import { IonicPage, NavController, NavParams, ModalController, AlertController, Platform } from 'ionic-angular';


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
  public conceptValue     : number = 1;
  public selectedItem     : IndicatorDTO;
  public concepts         : ConceptDTO[];
  public showObs : boolean = false;

  constructor(
    public navCtrl   : NavController, 
    public navParams : NavParams,
    public modalCtrl : ModalController,
    public avService : AvalicaoService,
    public platform  : Platform ,
    public alertCtrl : AlertController,
    public genService: GeneralService,
    public uService  : UserService) {

      platform.ready().then(() => {      

        setInterval(() => {
        
          this.groupItens();
          this.updateIdicators();
          
        },1000);  
      })
  }

  public showIndicator: boolean = false;

  // presentProfileModal(args: string) {
  //   if(args.startsWith('SeemPage')){
  //     let profileModal = this.modalCtrl.create(SeemPage);
  //   }else{

  //   } 
  //   let profileModal = this.modalCtrl.create(args);
  //   profileModal.present();
  // }
  
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
      this.gridColor = "#cbffc5";
    }
  }
  goback(){
    if(this.navCtrl.length() > 1){
      this.navCtrl.popTo(TabsPage);
    }else{
      this.navCtrl.setRoot('LoginPage');
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
    if(this.uService.getUserLogged().codigo != this.evaluation.avaliadorModificador.codigo){
      this.genService.showMessage('Esse avaliador não tem permissão para alterar!<br/>As altrações não serão salvas.');
      return;
    }
    if(this.evaluation.dataEntrega != null){
      this.genService.showMessage("Esta avaliação já esta encerrada.<br />Os dados não serão alterados. ");
      return;
    }
    if(this.avaIndicator != null){
      this.avaIndicator.parecer = this.observations;
      this.avService.updateObservationsIndicator(this.avaIndicator);
    }else{
      var data = <AvaliacaoIndicatorDTO> 
      {
        conceito : null,
        parecer  : this.observations,
        indicador: this.selectedItem,
        avaliacao: this.evaluation,
        usuario  : this.uService.getUserLogged()
      };
      this.avService.saveItemIndicator(data).subscribe(
        response => { 
          console.log(response) 
        },
        (error) => {
          this.genService.showMessage('Erro ao salvar ' + error);
          console.log(error); 

        } 
      ); 
    }
    this.hideObservation();
  }
  saveConcept(concept : number){
    if(this.uService.getUserLogged().codigo != this.evaluation.avaliadorModificador.codigo){
      this.genService.showMessage('Esse avaliador não tem permissão para alterar!<br/>As altrações não serão salvas.');
      return;
    }
    if(this.evaluation.dataEntrega != null){
      this.genService.showMessage("Esta avaliação já esta encerrada.<br />Os dados não serão alterados. ");
      return;
    }
    if(this.avaIndicator != null){
      this.avaIndicator.conceito = concept;
      this.avService.updateObservationsIndicator(this.avaIndicator);
      //this.genService.showMessage('Tetando atualizar');

    }else{
      //this.genService.showMessage('Tetando salvar');

      var data = <AvaliacaoIndicatorDTO> 
      {
        conceito : concept,
        parecer  : null,
        indicador: this.selectedItem,
        avaliacao: this.evaluation,
        usuario  : this.uService.getUserLogged()
      };

      // console.log('conceito : ' + concept);
      // console.log('parecer  : ' + null);
      // console.log('indicador: ' + this.selectedItem.codigo);
      // console.log('avaliacao: ' + this.evaluation.codigo);
      // console.log('usuario  : ' + this.uService.getUserLogged().codigo);

      this.avService.saveItemIndicator(data).subscribe(
        response => { 
          console.log(response);
 
        },
        (error) => {
          this.genService.showMessage('Erro ao salvar :\'(');
          console.log(error); 

        } 
      ); 
    }
    this.hideObservation();
  }
  showRadio(i : IndicatorDTO) {
    let alert = this.alertCtrl.create();
    alert.setTitle('Selecione');
    
    this.avService.getAvaIndicator(i.codigo, this.evaluation.codigo).subscribe(
      response => { 
        this.selectedItem = i;

        if(response != null){
          //this.conceptValue = response[0].conceito;
        }
        this.avaIndicator = response;
        this.avService.getConceptsByIndicator(i.codigo).subscribe(
          response => { 
            this.concepts = response;
            
            //Needs stay here.
            if(this.concepts != null){
              for( let cont = 0; cont < this.concepts.length; cont++ ){
        
                alert.addInput({
                  label :this.concepts[cont].descricao,
                  type: 'radio',
                  value: this.concepts[cont].conceito +"",
                  checked: (this.avaIndicator != null && this.avaIndicator.conceito == this.concepts[cont].conceito)
                });
              }
            }
            alert.addButton('Voltar');
    
        
            alert.present();
    
          },
          (error) => {
            this.genService.showMessage('Erro de leitura');
            console.log(error);     
          } 
        ); 
      } 
    ); 
    
    
    alert.addButton({
      text: 'Salvar',
      handler: data => {
       //this.genService.showMessage(data);
      //  this.conceptValue = data;

       this.saveConcept(Number.parseInt(data));
      }
    });
    
  }

  //Get all evaluations and add the atribute.
  public groupItens(){
    if(this.itens != null)
      this.itens.forEach(i => {
        this.avService.getAvaIndicator(i.codigo, this.evaluation.codigo).subscribe(
          response => { 
            if(response != null){              
              i.done = (response.conceito != null && response.parecer != null)
            }
          } 
        );
      });

  }
  public avaIndicator : AvaliacaoIndicatorDTO;

  showObservation(i : IndicatorDTO){   
   
    this.observations = "";

    this.avService.getAvaIndicator(i.codigo, this.evaluation.codigo).subscribe(
      response => { 
        if(response != null){
          this.observations = response.parecer;
          this.avaIndicator = response;
          i.done = (response.conceito != null && response.parecer != null)
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
  itemIsEvaluated(i : IndicatorDTO){
    return false;
  }
  ionViewDidLoad() {
    
    this.updateIdicators();
    
    if(this.evaluation != null){
      this.title = this.genService.nameAndDateToTitle(this.evaluation) ;
    }else{
      this.navCtrl.setRoot("LoginPage");     
    }      
  }
}
