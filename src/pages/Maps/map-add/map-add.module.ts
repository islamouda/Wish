import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MapAddPage } from './map-add';

@NgModule({
  declarations: [
    MapAddPage,
  ],
  imports: [
    IonicPageModule.forChild(MapAddPage),
  ],
})
export class MapAddPageModule {}
