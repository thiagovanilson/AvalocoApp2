import { NgModule } from '@angular/core';
import { IonicPageModule, Menu } from 'ionic-angular';
import { ChecklistPage } from './checklist';
@NgModule({
  declarations: [
    ChecklistPage,    
  ],
  imports: [
    IonicPageModule.forChild(ChecklistPage),
  ],
  entryComponents: [
   
  ],
})
export class ChecklistPageModule {}
