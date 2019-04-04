import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth }  from 'angularfire2/auth';
import { AngularFireDatabase ,AngularFireAction } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/switchMap';
import firebase from 'firebase';


/**
 * Generated class for the WishAchievedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-wish-achieved',
  templateUrl: 'wish-achieved.html',
})
export class WishAchievedPage {


  items$: Observable<AngularFireAction<firebase.database.DataSnapshot>[]>;
  size$: BehaviorSubject<string|null>;
  size1$: BehaviorSubject<string|null>;
  itemsprofile$: Observable<AngularFireAction<firebase.database.DataSnapshot>[]>;
  statusfilter:boolean=true;

  yes=true
  no=false

  constructor(
    public afAuth:AngularFireAuth,
    public navCtrl: NavController,
    public navParams: NavParams,
    public db: AngularFireDatabase
  ) {

    this.dataForWishUser()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WishAchievedPage');
  }


  dataForWishUser(){

    this.afAuth.authState.subscribe(auth =>{
      this.size$ = new BehaviorSubject(null); //added
      this.items$ = this.size$.switchMap(status =>  //added
        this.db.list(`/WishItem/`, ref =>  //added
        status ? ref.orderByChild('status').equalTo(status) : ref  //added
        ).snapshotChanges() //added
      );
      this.items$.subscribe(actions => {
       actions.forEach(action => {
         // console.log(action.type);
         console.log(action.key);
         console.log(action.payload.val().image);
         console.log( "this.userID >>>" +action.payload.val().uidUser);
         this.size1$ = new BehaviorSubject(null);
         this.itemsprofile$ = this.size1$.switchMap(uid =>  //added
         this.db.list(`/User/`, ref =>  //added
         uid ? ref.orderByChild(action.payload.val().uidUser).equalTo(uid) : ref  //adde    
      ).snapshotChanges()
       //added
      );
      this.itemsprofile$.subscribe(actions => {
        actions.forEach(action => {
          // console.log(action.type);
          // console.log(action.key);
          console.log(action.payload.val());
          console.log(action.payload.val().uid);  
         })  ;       
        });
      }); 
    });
    this.filterBy(this.yes);
  })
  }




  filterBy(size) {
    this.size$.next(size);
  }


}
