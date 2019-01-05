import { EvaluationPage } from './../evaluation/evaluation';
import { NavController, NavParams } from 'ionic-angular';
import { Component } from '@angular/core';

//import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { UserPage } from '../user/user';

//https://javiergarciaescobedo.es/ionic/479-navegacion-entre-paginas-en-ionic

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = EvaluationPage;
  tab3Root = EvaluationPage;
  tab4Root = EvaluationPage;
  tab5Root = UserPage;

 
  paramsSchedule = {
    title: "Avaliações agendadas"
  };
  paramsOpned = {
    title: "Avaliações Abertas"
  };
  
  constructor( public navCtrl: NavController, public params: NavParams) {

  }
  //Best way to not use the menu bar
  goToUser(){
    this.navCtrl.push(UserPage, );
  }
  goToSchudule(){
    this.navCtrl.setRoot(EvaluationPage, this.paramsSchedule );
  }
}
