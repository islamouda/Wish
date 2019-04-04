import { Component } from '@angular/core';
import { IonicPage, 
  NavController, 
  NavParams ,
  ToastController,
  AlertController,
  LoadingController} from 'ionic-angular';
import { AngularFireAuth }  from 'angularfire2/auth';
import { User } from '../../../model/user/user'
import { RegisterPage } from '../register/register';
import { Storage } from '@ionic/storage';
import { ProfilePage } from '../../Profiles/profile/profile';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  islogin:boolean=false;

  user = {} as User;


  logginIn= false;
  ress;
  userData: any;
  emailpassword;


  
  constructor(
    public afAuth:AngularFireAuth,
    public navCtrl: NavController, 
    public navParams: NavParams,
    private alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private toast: ToastController,
    public storage : Storage,


  ) {
    
    if (this.user.email != "" && this.user.password != "" ) {
      this.emailpassword = true
    } else {
      this.emailpassword = false
      
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }


  login(user:User) {
    this.afAuth.auth.signInWithEmailAndPassword(user.email ,user.password)
    .then(auth => {
      this.navCtrl.setRoot(ProfilePage);
      this.islogin=true;

      this.storage.set('islogin', this.islogin);
         this.toast.create({
              message: "اهلا بكم مجددا",
              duration: 3000
            }).present();

    })
    .catch(err => { 
      this.islogin=false;

      this.storage.set('islogin', this.islogin);
        let alert = this.alertCtrl.create({
            title: 'خطا بتسجيل الدخول',
            message: 'يرجى التحقق من الاميل والباسورد',
            buttons: ['حسنا']
        });
        alert.present(); 
    })
  }   
    // logout(){


    //   this.afAuth.auth.signOut().then(logout =>{
    //     this.islogin=false;
        
    //     this.storage.set('islogin', this.islogin);
    //     this.navCtrl.setRoot(TabsPage)
    //   })

    // }


register(){
  this.navCtrl.push(RegisterPage);
}




}
