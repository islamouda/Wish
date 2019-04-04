import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WishItem } from '../../../model/wish-item/wish-item';
import { WishServiceProvider } from '../../../providers/wish-service/wish-service';
import { AngularFireAuth }  from 'angularfire2/auth';
import { AngularFireDatabase  } from 'angularfire2/database';
import { ProfilePage } from '../profile/profile';

/**
 * Generated class for the ProfileWishEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile-wish-edit',
  templateUrl: 'profile-wish-edit.html',
})
export class ProfileWishEditPage {
  public pan: number = 0;

  contrast: number = 0;
  warmth: number = 0;
  no=false
  itemWishUser:WishItem= {

 
    key: '',
    title: '', 
    subject: '',
    image:'',
    status:this.no,
    uidUser:'',


}


  constructor(
    
    public navCtrl: NavController, 
    public navParams: NavParams,
    public db: AngularFireDatabase,
    public wishServiceProvider:WishServiceProvider,
    public afAuth:AngularFireAuth,

  ) {

    this.itemWishUser.key = this.navParams.get('key')
    this.itemWishUser.title = this.navParams.get('title')
    this.itemWishUser.subject = this.navParams.get('subject')
    this.itemWishUser.image = this.navParams.get('image')
    this.itemWishUser.status = this.navParams.get('status')
    this.itemWishUser.uidUser = this.navParams.get('uidUser')
 


  }
  panEvent(e) {
    this.pan++
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfileWishEditPage');
  }


  updateWish(itemWishUser:WishItem){
    this.wishServiceProvider.updateWishItem(itemWishUser).then( () =>{
      this.navCtrl.setRoot(ProfilePage)
      console.log('updated')
    })
  }

 
  removeWish(itemWishUser:WishItem){
    this.wishServiceProvider.removeWishItem(itemWishUser).then( () =>{
      this.navCtrl.setRoot(ProfilePage)
 
      console.log('updated')
 
    })  
  }

}
