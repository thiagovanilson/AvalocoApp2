import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IndicatorPage } from './indicator';

@NgModule({
  declarations: [
    IndicatorPage,
  ],
  imports: [
    IonicPageModule.forChild(IndicatorPage),
  ],
})
export class IndicatorPageModule {}
