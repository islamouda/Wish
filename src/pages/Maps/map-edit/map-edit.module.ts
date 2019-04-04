import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MapEditPage } from './map-edit';

@NgModule({
  declarations: [
    MapEditPage,
  ],
  imports: [
    IonicPageModule.forChild(MapEditPage),
  ],
})
export class MapEditPageModule {}
