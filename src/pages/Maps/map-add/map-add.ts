import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Locations } from '../../../model/locations/locations'
import { MapServiceProvider } from '../../../providers/map-service/map-service';
import { AlertController } from 'ionic-angular';
import { MapEditPage } from '../map-edit/map-edit';

@IonicPage()
@Component({
  selector: 'page-map-add',
  templateUrl: 'map-add.html',
})
export class MapAddPage {


  locations:Locations={
    latitude:'',
    longitude:'',
    info:''
  }



  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public mapServiceProvider:MapServiceProvider,
    public alertCtrl: AlertController
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapAddPage');
  }
  addLocation(locations:Locations){
    this.mapServiceProvider.addLocation(locations).then(ref =>{
      this.showAlert()
      this.navCtrl.setRoot(MapEditPage)
    })

  }

  showAlert() {
    const alert = this.alertCtrl.create({
      title: ' رائع!',
      subTitle: 'شكرا لكم!',
      buttons: ['حسناَ']
    });
    alert.present();
  }




}
