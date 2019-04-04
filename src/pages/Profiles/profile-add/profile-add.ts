import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,LoadingController} from 'ionic-angular';
import { AngularFireAuth  }  from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Camera, CameraOptions } from '@ionic-native/camera';
import * as firebase from 'firebase' ;

import { TabsPage } from '../../tabs/tabs';
import { Storage } from '@ionic/storage';
import { Profile_Item } from '../../../model/Profile_Item/Profile_Item';


/**
 * Generated class for the ProfileAddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile-add',
  templateUrl: 'profile-add.html',
})
export class ProfileAddPage {


//  this Item for profile per user 
profile:Profile_Item={
  name : this.afAuth.auth.currentUser.displayName,
  age : '',
  phone : this.afAuth.auth.currentUser.phoneNumber,
  province : '',
  uid : this.afAuth.auth.currentUser.uid,
  email : this.afAuth.auth.currentUser.email,
  image : this.afAuth.auth.currentUser.photoURL,
  status : false,
  admin : '',
}


// this variable for Camera function 
selectedPhoto;
loading;
currentImage;
UIDUSER;
myPhotoURL;

display;
display1;
showimage;
islam;




name;
email;
image;
username;


gaming: string = "n64";
gender: string = "f";
os: string;
music: string;
month: string;
year: number;
musicAlertOpts: { title: string, subTitle: string };

test;


  constructor(
    
    public afAuth:AngularFireAuth,
    public navCtrl: NavController,
    public navParams: NavParams,
    public afDATA : AngularFireDatabase,
    public loadingCtrl:LoadingController,
    public camera : Camera,
    public storage : Storage

  ) {
    


this.musicAlertOpts = {
  title: 'المحافظة',
  subTitle: 'Select your favorite'
};




this.profile.status = false ;

if (this.currentImage = null) {
  this.display = false
}else{
 this.display = true
}
console.log( this.display)

return this.display



  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfileAddPage');
  }

// this code for create User Informaiton in Firebase
  createUserProfile(profile:Profile_Item){

// this code for get  currentUser Informaiton
this.afAuth.authState.take(1).subscribe(auth =>{

// this code to make image data if user Login with Email&Pass the image data will be User Uid else user Log in with facebook or google the image data will be image information from API


if (this.currentImage == null) {
  
  this.islam = 'person';
  this.UIDUSER = this.islam;
} else {
  
  this.UIDUSER = this.afAuth.auth.currentUser.uid ;
   
      }

this.upload()


this.afDATA.object('User/'+auth.uid).set({
  name : profile.name,
  age:profile.age,
      phone:profile.phone, 
      province:profile.province,
      uid:this.afAuth.auth.currentUser.uid,
      email: profile.email,
      image : this.UIDUSER,
      status : profile.status,
      admin:profile.admin,
    }).then(newEmployee => {
      this.navCtrl.setRoot(TabsPage);
    })
  })
  
 
}





  // this code for Camera "Start"
  upload(){
    if(this.selectedPhoto){
      var uploadTask =  firebase.storage().ref().child('Users/'+this.UIDUSER+'.jpg').put(this.selectedPhoto);
  
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


  



}
