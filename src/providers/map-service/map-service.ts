import { Injectable } from '@angular/core';
import {Locations } from '../../model/locations/locations'
import { AngularFireDatabase } from 'angularfire2/database';

/*
  Generated class for the MapServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MapServiceProvider {

  private MapGSP = this.db.list<Locations>('Map')



  constructor(public db:AngularFireDatabase) {
    console.log('Hello MapServiceProvider Provider');
  }


  getLocationList(){
    return this.MapGSP;
  }


  addLocation(locations:Locations){
    return this.MapGSP.push(locations)
    
  }

  updateLocation(locations:Locations){
    return this.MapGSP.update(locations.key,locations)
    
  }

  
  removeLocation(locations){
    return this.MapGSP.remove(locations)
    
  }


}
