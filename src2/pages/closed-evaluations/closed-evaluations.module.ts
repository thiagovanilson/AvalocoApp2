import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClosedEvaluationsPage } from './closed-evaluations';

@NgModule({
  declarations: [
    ClosedEvaluationsPage,
  ],
  imports: [
    IonicPageModule.forChild(ClosedEvaluationsPage),
  ],
})
export class ClosedEvaluationsPageModule {}
