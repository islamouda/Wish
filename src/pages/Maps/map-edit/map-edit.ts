import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MapServiceProvider } from '../../../providers/map-service/map-service';
import {Locations } from '../../../model/locations/locations'

import { AlertController } from 'ionic-angular';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { MapAddPage } from '../map-add/map-add';




/**
 * Generated class for the MapEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-map-edit',
  templateUrl: 'map-edit.html',
})
export class MapEditPage {



  Maplist : AngularFireObject<any>
  locations:Locations={
    latitude:'',
    longitude:'',
    info:''
  };

  itemArray=[];
  myObject = []




  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public mapServiceProvider:MapServiceProvider,
    public alertCtrl: AlertController,
    public db: AngularFireDatabase) {
 
 
      this.Maplist = db.object('Map');
    this.Maplist.snapshotChanges().subscribe(action => {
     

      if (action.payload.val() == null || action.payload.val() == undefined) {
        console.log('no data' )
      } else {

      this.itemArray.push(action.payload.val() as Locations)
      console.log ( this.itemArray)
      this.myObject = Object.entries(this.itemArray[0])
      console.log ( this.myObject)
    }

 
     });



  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapEditPage');
  }


  updateLocation(locations:Locations){
    this.mapServiceProvider.updateLocation(locations).then( () =>{
      this.navCtrl.setRoot(MapEditPage)
      console.log('updated')
    })
  }

  
  removeLocation(locations:Locations){
    this.mapServiceProvider.removeLocation(locations).then( () =>{
      this.navCtrl.setRoot(MapEditPage)

      console.log('updated')

    })  
  }



  showPrompt(key , info , latitude , longitude ) {
    const prompt = this.alertCtrl.create({
      title: 'تعديل',
      message: "تعديل على المعلومات الحالية ",
      inputs: [
        {
          name: 'Info',
          value: info
        },
        {
          name: 'Latitude',
          value: latitude
        },
        {
          name: 'Longitude',
          value: longitude
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            // console.log('Saved clicked');

            this.locations.info = data.Info
            this.locations.latitude = data.Latitude
            this.locations.longitude = data.Longitude
            this.locations.key = key
            this.updateLocation(this.locations)
            
          }
     

        }
      ]
    });
    prompt.present();
  }


  AddLoaction(){
    this.navCtrl.push(MapAddPage)
  }

  
}
