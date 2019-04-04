import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,LoadingController } from 'ionic-angular';
import { AngularFireDatabase  ,AngularFireAction  } from 'angularfire2/database';
import { AngularFireAuth }  from 'angularfire2/auth';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import { ProfileEditPage } from '../profile-edit/profile-edit';
import { ProfileWishEditPage } from '../profile-wish-edit/profile-wish-edit';
import { LoginPage } from '../../auth/login/login';
import { Storage } from '@ionic/storage';
import { WishAddPage } from '../../Wishs/wish-add/wish-add';
import { MapEditPage } from '../../Maps/map-edit/map-edit';


/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  wishItem= {

 
    key: '',
    title: '', 
    subject: '',
    image:'',
    status:'',
    uidUser:'',
}
loading;


  size$: BehaviorSubject<string|null>;
  itemsprofile$: Observable<AngularFireAction<firebase.database.DataSnapshot>[]>;
  items$: Observable<AngularFireAction<firebase.database.DataSnapshot>[]>;
  UserID;
  islogin
  logginIn
  constructor(
    public afAuth:AngularFireAuth,
    public navCtrl: NavController,
    public navParams: NavParams,
    public db: AngularFireDatabase,
    private storage: Storage,
    public loadingCtrl: LoadingController
  ) {

    this.storage.get('islogin').then((val) => {
      console.log('Your islogin >>', val);
    if (val==true || this.UserID != null ) {
      console.log("Your islogin >> Sinin Success");
  this.UserID = this.afAuth.auth.currentUser.uid;
      this.showLoader();
      this.UserData()
      this.WishUser()
      this.loading.dismiss();

    } else {
      console.log("Your islogin >> Sinin Faild");
          this.navCtrl.setRoot(LoginPage)
    }
  });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }


  gotoaddwishs(){
    this.navCtrl.push(WishAddPage)
  }

UserData(){
  //start this code for Wish post per User
  this.afAuth.authState.subscribe(auth =>{
    
    this.size$ = new BehaviorSubject(null); //added
    this.items$ = this.size$.switchMap(uidUser =>  //added
      this.db.list(`/WishItem/`, ref =>  //added
      uidUser ? ref.orderByChild('uidUser').equalTo(uidUser) : ref  //added
      ).snapshotChanges() //added
    );
  
    this.items$.subscribe(actions => {
     actions.forEach(action => {
       // console.log(action.type);
       // console.log(action.key);
       console.log(action.payload.val());
  
      })  ; 
      
    });
    
    this.filterBy(this.UserID);
  })
  //end this code for Wish post per User
}


WishUser(){
  this.afAuth.authState.subscribe(auth =>{
  

    this.size$ = new BehaviorSubject(null); //added
    this.itemsprofile$ = this.size$.switchMap(uid =>  //added
      this.db.list(`/User/`, ref =>  //added
      uid ? ref.orderByChild('uid').equalTo(uid) : ref  //added
      ).snapshotChanges() //added
    );
  
    this.itemsprofile$.subscribe(actions => {
     actions.forEach(action => {

      });

      
    });
    this.filterBy(this.UserID);
  })
}
  filterBy(size: string|null) {
    this.size$.next(size);
  }

  ProfileSelected(key,name,email,phone,province,age,image,uid,admin){
    console.log(key,name,email,phone,province,age,image,uid,admin);
    this.navCtrl.push(ProfileEditPage,{
      key : key,
      name : name,
      email : email,
      phone : phone ,
      province : province ,
      age:age,
      image:image,
      uid:uid,
      admin:admin,
      
    });}


    itemSelected(key, uidUser,title, subject, image, status){
      console.log(key, title, subject, image, status);
      this.navCtrl.push(ProfileWishEditPage,{
        key : key,
        uidUser:uidUser,
        title : title,
        subject : subject,
        image : image,
        status : status ,
            });
            
     }
Logout(){

    this.afAuth.auth.signOut().then(logout =>{
this.navCtrl.setRoot(LoginPage)
    })

    this.islogin=false;

    this.storage.set('islogin', this.islogin);
}

GoToMap(){
  this.navCtrl.push(MapEditPage)
}


showLoader(){
 
  this.loading = this.loadingCtrl.create({
      content: 'يرجى الانتظار يعتمد على سرعة الانترنت ...'
  });

  this.loading.present();

}
}
