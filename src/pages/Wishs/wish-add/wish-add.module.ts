import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WishAddPage } from './wish-add';

@NgModule({
  declarations: [
    WishAddPage,
  ],
  imports: [
    IonicPageModule.forChild(WishAddPage),
  ],
})
export class WishAddPageModule {}
