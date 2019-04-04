import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,LoadingController} from 'ionic-angular';
import * as firebase from 'firebase' ;
import { AngularFireAuth  }  from 'angularfire2/auth';
import { AngularFireDatabase  } from 'angularfire2/database';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { TabsPage } from '../../tabs/tabs';
import { ProfilePage } from '../profile/profile';

/**
 * Generated class for the ProfileEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile-edit',
  templateUrl: 'profile-edit.html',
})
export class ProfileEditPage {


  selectedPhoto;
  loading;
  currentImage;
  UIDUSER;
  myPhotoURL;
  UserID;
  display;

 


  key:string;
  name:string;
  email:string;
  phone :string;
  province:string;
  age:string;
  image:string;
  uid:string;
  admin:string;



  musicAlertOpts: { title: string, subTitle: string };
  warmth: number = 1;


  constructor(
    public afAuth:AngularFireAuth,
    public navCtrl: NavController,
    public navParams: NavParams,
    public afDATA : AngularFireDatabase,
    public loadingCtrl:LoadingController,
    public camera : Camera,
  ) {
    this.musicAlertOpts = {
      title: 'المحافظة',
      subTitle: 'اختار المحافظة'
    };
  

    this.key = this.navParams.get('key')
    this.name = this.navParams.get('name')
    this.email = this.navParams.get('email')
    this.phone = this.navParams.get('phone')
    this.province = this.navParams.get('province')
    this.age = this.navParams.get('age')
    this.image = this.navParams.get('image')
    this.uid = this.navParams.get('Uid')
    this.admin = this.navParams.get('Admin')
    
    this.UserID = this.afAuth.auth.currentUser.uid
    this.UIDUSER = this.UserID
    if (this.currentImage = null) {
      this.display = false
   }else{
     this.display = true
    }
    console.log( this.display)

   return this.display
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfileEditPage');
  }


  UpdataUserProfile(name,phone,province,age,image,uid,admin){
    this.afAuth.authState.take(1).subscribe(auth =>{
    
this.upload()

this.afDATA.object('User/'+auth.uid).update({

  name : name,
  phone:phone,
  province:province,
  age:age,
  image : image,
  // Uid:this.UIDUSER,
  // admin:admin,
    }).then(UserProfile => {
      this.navCtrl.setRoot(ProfilePage);
    })
  })

}


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



GoToProfile(){
  this.navCtrl.setRoot(TabsPage)
}

getURLIMAGE(UIDUSER){
    
  firebase.storage().ref().child('images/'+UIDUSER+'.jpg').getDownloadURL()
  .then((url)=>{
    this.myPhotoURL = url
  })
}



  


}
