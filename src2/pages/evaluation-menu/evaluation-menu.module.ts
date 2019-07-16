import { NgModule           } from '@angular/core';
import { EvaluationMenuPage } from './evaluation-menu';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
  declarations: [
    EvaluationMenuPage ,
  ],
  imports: [
    IonicPageModule.forChild(EvaluationMenuPage),
  ],
  entryComponents: [
  ],
})
export class EvaluationMenuPageModule {}
