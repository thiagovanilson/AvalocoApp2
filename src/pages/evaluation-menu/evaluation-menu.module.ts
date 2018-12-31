import { NgModule           } from '@angular/core';
import { IonicPageModule    } from 'ionic-angular';
import { EvaluationMenuPage } from './evaluation-menu';

@NgModule({
  declarations: [
    EvaluationMenuPage    
  ],
  imports: [
    IonicPageModule.forChild(EvaluationMenuPage),
  ],
  entryComponents: [
  ],
})
export class EvaluationMenuPageModule {}
