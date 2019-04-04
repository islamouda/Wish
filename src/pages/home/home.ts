import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController} from 'ionic-angular';
import { AngularFireAuth }  from 'angularfire2/auth';
import { AngularFireDatabase  ,AngularFireObject,AngularFireAction } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/switchMap';
import firebase from 'firebase';
import { WishAddPage } from '../Wishs/wish-add/wish-add';
import { WishAchievedPage } from '../Wishs/wish-achieved/wish-achieved';
import { WishShowPage } from '../Wishs/wish-show/wish-show';
import { LoginPage } from '../auth/login/login';
import { WishItem } from '../../model/wish-item/wish-item';
import { Profile_Item } from '../../model/Profile_Item/Profile_Item';
import { LoadingController } from 'ionic-angular';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage() 
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

items$: Observable<AngularFireAction<firebase.database.DataSnapshot>[]>;
size$: BehaviorSubject<string|null>;
itemsprofile$: Observable<AngularFireAction<firebase.database.DataSnapshot>[]>;

itemArray= []; 
itemArray1= []; 
myObject=[];
myObjectuser=[];
myObject2=[];
myObject2user=[];
loading: any;


WishItem :AngularFireObject<any>
Profile_Item :AngularFireObject<any>
data:WishItem ={
    
  key:"",
  uidUser:"",
  title:"",
  subject:"",
  image:"",
  status:true,


}


data1:Profile_Item = {
  name :"",
  age :"",
  phone :"",
  province :"",
  uid :"",
  email :"",
  image :"",
  status :false,
  admin :"",
}

  constructor(
    public afAuth:AngularFireAuth,
    public navCtrl: NavController,
    public navParams: NavParams,
    public db: AngularFireDatabase,
    private alertCtrl: AlertController,
    public loadingCtrl: LoadingController
  ) {

    // this.dataForWishUser()
    this.WishItem =db.object('WishItem');
    this.Profile_Item =db.object('User');
    

    this.showLoader();
    this.DataWish()
    this.Dateprofile()
    this.loading.dismiss();

  }
  ionViewDidLoad() {

    
    console.log('ionViewDidLoad HomePage');
    // this.showLoader();
    // this.DataWish();
    // this.loading.dismiss();
  }

  
  ionViewWillEnter(){
  }


  DataWish(){
   
    this.WishItem.snapshotChanges().subscribe(action =>{

      if (action.payload.val()==null || action.payload.val()== undefined) {
        console.log('no data')
      } else {
      
        this.itemArray.push(action.payload.val() as WishItem)
        
        this.myObject = Object.entries(this.itemArray[0])
        this.myObject.reverse()
        this.myObject2=this.myObject;
      }
    })}
  //   this.Profile_Item.snapshotChanges().subscribe(action =>{

  //     if (action.payload.val()==null || action.payload.val()== undefined) {
  //       console.log('no data')
  //     } else {
      
  //       this.itemArray1.push(action.payload.val() as WishItem)
        
  //       this.myObjectuser = Object.entries(this.itemArray1[0])
  //       this.myObjectuser.reverse()
  //       this.myObject2user=this.myObjectuser;
  //     }
  //   })
   
  // }


  Dateprofile(){
    // this.showLoader();

    this.Profile_Item.snapshotChanges().subscribe(action =>{

      if (action.payload.val()==null || action.payload.val()== undefined) {
        console.log('no data')
      } else {
      
        this.itemArray1.push(action.payload.val() as WishItem)
        
        this.myObjectuser = Object.entries(this.itemArray1[0])
        this.myObjectuser.reverse()
        this.myObject2user=this.myObjectuser;
      }
    })
    // this.loading.dismiss();
  }


  getItems(ev: any) {
    // Reset items back to all of the items
    this.myObject=this.myObject2

    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.myObject = this.myObject.filter((searchbar) => {
        
        return(searchbar[1]['title'].toLowerCase().indexOf(val.toLowerCase()) > -1)
      })
    }

  }

  showLoader(){
 
    this.loading = this.loadingCtrl.create({
        content: 'يرجى الانتظار يعتمد على سرعة الانترنت ...'
    });
  
    this.loading.present();
  
  }

GoToWishAdd(){
  this.navCtrl.push(WishAddPage).catch(err => { 
     let alert = this.alertCtrl.create({
          title: 'Error in Login',
          message: 'يرجى تسجيل الدخول اولا',
          buttons: ['OK']
      });
      alert.present(); 
      this.navCtrl.setRoot(LoginPage)
  })
    }
  
AddWish(){
      this.navCtrl.push(WishAddPage)
    }

 WishAchieved(){
      this.navCtrl.push(WishAchievedPage)
    }      
 WishShow(){
      this.navCtrl.push(WishShowPage)
    }  

  
ProfileSelected(key,name,email,phone,province,age,image,uid,admin,keyWish, uidUser,title, subject, imageWish, status){
 console.log(key,name,email,phone,province,age,image,uid,admin);
this.navCtrl.push(WishShowPage,{
key : key,
name : name,
email : email,
phone : phone ,
province : province ,
age:age,
image:image,
uid:uid,
admin:admin,
keyWish : keyWish,
uidUser:uidUser,
title : title,
subject : subject,
imageWish : imageWish,
status : status ,
});}
  
  
itemSelected(key, uidUser,title, subject, image, status){
        console.log(key, title, subject, image, status);
        this.navCtrl.push(WishShowPage,{
          key : key,
          uidUser:uidUser,
          title : title,
          subject : subject,
          image : image,
          status : status ,
              });
              
      }
      presentLoading(){
      
        this.loadingCtrl.create({
          content: 'Please wait...',
          duration: 3000,
          dismissOnPageChange: true
        }).present(); 
      }
  
}
