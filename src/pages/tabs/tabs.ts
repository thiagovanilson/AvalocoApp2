import { EvaluationPage } from './../evaluation/evaluation';
import { NavController } from 'ionic-angular';
import { Component } from '@angular/core';

//import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { UserPage } from '../user/user';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = EvaluationPage;
  tab3Root = ContactPage;
  tab4Root = ContactPage;
  tab5Root = UserPage;

  constructor( public navCtrl: NavController) {

  }
  goToUser(){
    this.navCtrl.push(UserPage);
  }
}
