import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WishItem } from '../../../model/wish-item/wish-item';
import { AlertController } from 'ionic-angular'; 
import { LoadingController } from 'ionic-angular';
   
/**
 * Generated class for the WishShowPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-wish-show',
  templateUrl: 'wish-show.html',
})
export class WishShowPage {
  no=false
imageShare;
imageShare1;
urlShare;
  itemWish:WishItem= {

 
    key: '',
    title: '', 
    subject: '',
    image:'',
    status:this.no,
    uidUser:'',
}
loading;
itemUser ={
  key:'',
  name:'',
  email:'',
  phone:'',
  province:'',
  age:'',
  image:'',
  uid:'',
  admin:''
}
massage;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    ) {




    
      this.showLoader();
      this.itemUser.key = this.navParams.get('key')
      this.itemUser.name = this.navParams.get('name')
      this.itemUser.email = this.navParams.get('email')
      this.itemUser.phone = this.navParams.get('phone')
      this.itemUser.province = this.navParams.get('province')
      this.itemUser.age = this.navParams.get('age')
      this.itemUser.image = this.navParams.get('image')
      this.itemUser.uid = this.navParams.get('uid')
      this.itemUser.admin = this.navParams.get('admin')
    
      this.itemWish.key = this.navParams.get('keyWish')
      this.itemWish.title = this.navParams.get('title')
      this.itemWish.subject = this.navParams.get('subject')
      this.itemWish.image = this.navParams.get('imageWish')
      this.itemWish.status = this.navParams.get('status')
      this.itemWish.uidUser = this.navParams.get('uidUser')
      this.loading.dismiss();    
    }
  
    ionViewDidLoad() {
      console.log('ionViewDidLoad WishShowPage');
      this.ionViewWillEnter();
    }
  
    ionViewWillEnter(){
    }
  Data(){
    this.itemUser.key = this.navParams.get('key')
    this.itemUser.name = this.navParams.get('name')
    this.itemUser.email = this.navParams.get('email')
    this.itemUser.phone = this.navParams.get('phone')
    this.itemUser.province = this.navParams.get('province')
    this.itemUser.age = this.navParams.get('age')
    this.itemUser.image = this.navParams.get('image')
    this.itemUser.uid = this.navParams.get('uid')
    this.itemUser.admin = this.navParams.get('admin')
  
    this.itemWish.key = this.navParams.get('keyWish')
    this.itemWish.title = this.navParams.get('title')
    this.itemWish.subject = this.navParams.get('subject')
    this.itemWish.image = this.navParams.get('imageWish')
    this.itemWish.status = this.navParams.get('status')
    this.itemWish.uidUser = this.navParams.get('uidUser')
  
    this.massage = "يرجى الضغط على لصق" 
    this.imageShare1 = 
    this.imageShare  ="https://firebasestorage.googleapis.com/v0/b/wish-74721.appspot.com/o/Wish%2F6SMv49WWBxZTFcqcq4mPPSPg3g62327.jpg?alt=media&token=ebf5df23-8081-4e12-861c-0d1789aa2385"
    this.urlShare = "https://ionicframework.com/docs/native/social-sharing/"

    
}
// SharingFacebook(){

//   this.socialSharing.shareViaFacebookWithPasteMessageHint(this.imageShare,this.imageShare,this.imageShare,"يمكن الضغط على لصق").then(() => {
//     let alert = this.alertCtrl.create({
//       title: 'Seccis',
//       message: 'OK',
//       buttons: ['OK']});
//       alert.present(); 
//  }).catch(err => {
   
//   let alert = this.alertCtrl.create({
//     title: 'Error in Login',
//     message: 'Please check your login credentials' + err + 'Pls try again',
//     buttons: ['OK']


//     });
//     alert.present(); 
//   })
// }

showLoader(){
 
  this.loading = this.loadingCtrl.create({
      content: 'يرجى الانتظار يعتمد على سرعة الانترنت ...'
  });

  this.loading.present();


}


}
