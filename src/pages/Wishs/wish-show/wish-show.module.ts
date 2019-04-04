import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WishShowPage } from './wish-show';

@NgModule({
  declarations: [
    WishShowPage,
  ],
  imports: [
    IonicPageModule.forChild(WishShowPage),
  ],
})
export class WishShowPageModule {}
