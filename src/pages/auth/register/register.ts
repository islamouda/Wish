import { Component } from '@angular/core';
import { IonicPage, 
  NavController, 
  NavParams ,
  ToastController,
  AlertController,
  LoadingController} from 'ionic-angular';
import { AngularFireAuth }  from 'angularfire2/auth';
import { User } from '../../../model/user/user'
import { ProfileAddPage } from '../../Profiles/profile-add/profile-add';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {


  user = {} as User;



  constructor(
    public afAuth:AngularFireAuth,
    public navCtrl: NavController, 
    public navParams: NavParams,
    private alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private toast: ToastController,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }



  register(user:User) {


    this.afAuth.auth.createUserWithEmailAndPassword(user.email,user.password)
    .then(auth => {
      this.navCtrl.setRoot(ProfileAddPage);
         this.toast.create({
              message: "Wellcom "+" "+ this.afAuth.auth.currentUser.email,
              duration: 3000
            }).present();
    })
    .catch(err => { 
        let alert = this.alertCtrl.create({
            title: 'Error in Login',
            message: 'Please check your login credentials' + err + 'Pls try again',
            buttons: ['OK']
        });
        alert.present(); 
    })
  }


}
