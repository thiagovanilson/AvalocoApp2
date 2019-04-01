import { Injectable } from "@angular/core";
import { NavController } from "ionic-angular";
import { TabsPage } from "../pages/tabs/tabs";


@Injectable()
export class NavigationsService {
 
    constructor(public navCtrl: NavController){}

    goback(){
        if(this.navCtrl.length() > 1){
        //Previus page
        this.navCtrl.popTo(TabsPage);
        }else{
        //Home page
        this.navCtrl.push(TabsPage);
        }
    }
}