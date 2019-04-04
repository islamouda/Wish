import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { ViewChild , ElementRef } from '@angular/core'
import {Locations } from '../../../model/locations/locations'
import { AngularFireDatabase , AngularFireList } from 'angularfire2/database'
import { LoadingController } from 'ionic-angular';


declare let google:any




@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {

  

  @ViewChild('map') mapElement:ElementRef
  map:any
  itemList : AngularFireList<any>
  itemArray  = []

  loading: any;



  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public db:AngularFireDatabase,
    public alertCtrl:AlertController,
    public loadingCtrl: LoadingController

  ) {


    this.itemList = db.list('Map')

  }

  ionViewDidLoad() {

    console.log('ionViewDidLoad MapPage');
    this.showLoader();
    this.loadMap();
    this.loading.dismiss();

  }


  showLoader(){
 
    this.loading = this.loadingCtrl.create({
        content:  'يرجى الانتظار يعتمد على سرعة الانترنت ...'
    });
  
    this.loading.present();
  
  }

  loadMap(){
    
    let LatLng = new google.maps.LatLng(33.2232 , 43.6793  );
    let mapOptions = {
      center:LatLng,
      zoom: 5.8,
  mapTypeId: google.maps.MapTypeId.ROADMAP
  
    }



    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);


    this.itemList.snapshotChanges().subscribe(actions => {
      actions.forEach(action=>{
        let y = action.payload.toJSON()
        y['key'] = action.key
        this.itemArray.push(y as Locations)
      })

      for (const value of this.itemArray) {
        let marker = new google.maps.Marker({
          position : new google.maps.LatLng(value['latitude'],value['longitude']),
          map: this.map
        });

        marker.info = new google.maps.InfoWindow({
          content: value['info']
    })

    google.maps.event.addListener(marker , 'click' , function(){
      let marker_map = this.getMap();
      this.info.open(marker_map,this)
      alert(this.info.content)
    });

  }
  })

}


}
