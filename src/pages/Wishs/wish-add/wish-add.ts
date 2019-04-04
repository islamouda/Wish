import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,LoadingController } from 'ionic-angular';
import { WishItem } from '../../../model/wish-item/wish-item';
import { WishServiceProvider } from '../../../providers/wish-service/wish-service';
import { AlertController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { AngularFireAuth }  from 'angularfire2/auth';
import { AngularFireAction } from 'angularfire2/database';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/switchMap';
import firebase from 'firebase';
import { ProfilePage } from '../../Profiles/profile/profile';
/**
 * Generated class for the WishAddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-wish-add',
  templateUrl: 'wish-add.html',
})
export class WishAddPage {



  valu :any
imageName;
selectedPhoto;
loading;
currentImage;
myPhotoURL;


uidRand;
myRand: number;
yes=true
no=false
display;
UIDUSER;
islam;
wishItem:WishItem ={
 
    key: '',
    title: '', 
    subject: '',
    image:this.imageName,
    status: this.no,
    uidUser:this.afAuth.auth.currentUser.uid

}



items$: Observable<AngularFireAction<firebase.database.DataSnapshot>[]>;
size$: BehaviorSubject<string|null>;




  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public afAuth:AngularFireAuth,
    private wishServiceProvider: WishServiceProvider,
    public alertCtrl: AlertController,
    public loadingCtrl:LoadingController,
    public camera : Camera,
        ) {



    
    this.myRand=this.random();
    this.uidRand = this.afAuth.auth.currentUser.uid
    this.imageName = this.uidRand + this.myRand 
    console.log(this.imageName);



    if (this.currentImage = null) {
      this.display = false

      
   }else{
     this.display = true

    }
    
    console.log( this.display)

   return this.display


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WishAddPage');
  }


  addwishitem(wishItem:WishItem){

    if (this.currentImage == null) {
  
      this.islam = "wish";
      this.UIDUSER = this.islam;
    } else {
      
      this.UIDUSER = this.imageName ;
       
          }

          wishItem.image = this.UIDUSER
    this.wishServiceProvider.addWishItem(wishItem).then(ref =>{
      
      this.showAlert()
      this.navCtrl.setRoot(ProfilePage)
      // or
      // this.navCtrl.pop
    })


     this.upload(this.wishItem.image); 
    

  }


  showAlert() {
    const alert = this.alertCtrl.create({
      title: ' رائع!',
      subTitle: 'شكرا لكم!',
      buttons: ['حسناَ']
    });
    alert.present();
  }






  upload(imageName){
    if(this.selectedPhoto){
      var uploadTask =  firebase.storage().ref().child('Wish/'+imageName+'.jpg').put(this.selectedPhoto);
  
      uploadTask.then(this.onError);
    }
  }
  
  onError = (error) => {
    console.log(error);
    this.loading.dismiss();
  }
  
  
  
  
  
  
  
  takePhoto(){
  
  const options : CameraOptions = {
  
    quality:100,
  
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType:this.camera.MediaType.PICTURE,
    sourceType:this.camera.PictureSourceType.PHOTOLIBRARY
  }
  
  this.camera.getPicture(options).then((ImageData)=>{
    this.loading = this.loadingCtrl.create({
      content: 'Taking photo :) '
    });
  
    this.loading.present();
    this.selectedPhoto = this.dataURLtoBlob('data:image/jpeg;base64,'+ImageData);
    this.loading.dismiss();
    // this.currentImage = 'data:image/jpeg;base64,'+ImageData;
    this.currentImage = 'data:image/jpeg;base64,'+ImageData;
  
  },(err)=>{
    console.log(err);
  }) ;
  
  
  }
  
  
  dataURLtoBlob(dataURL){
  let binary = atob(dataURL.split(',')[1]);
  let array = [];
  for (let index = 0; index < binary.length; index++) {
    array.push(binary.charCodeAt(index));
  
  }
  return new Blob([new Uint8Array(array)],{type:'image/jpeg'});
  }
  




  random(): number {
    let rand = Math.floor(Math.random()*1000)+1;
    return rand;       
 }


 backtoprofile(){
this.navCtrl.setRoot(ProfilePage)
 }

}
