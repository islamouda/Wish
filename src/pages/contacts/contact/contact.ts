import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AboutTeamPage } from '../about-team/about-team';
import { AboutCodePage } from '../about-code/about-code';
import { AboutApplicationPage } from '../../contacts/about-application/about-application';
import { LoadingController } from 'ionic-angular';


/**
 * Generated class for the ContactPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
})
export class ContactPage {


  loading: any;


    
  constructor(public navCtrl: NavController, public navParams: NavParams,public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    this.showLoader();
    console.log('ionViewDidLoad ContactPage');
    this.loading.dismiss();
  }

  about_team(){
    this.navCtrl.setRoot(AboutTeamPage)
  }

  about_code(){
    this.navCtrl.setRoot(AboutCodePage)

  }

  about_application(){
    this.navCtrl.setRoot(AboutApplicationPage)

  }

  showLoader(){
 
    this.loading = this.loadingCtrl.create({
        content: 'يرجى الانتظار يعتمد على سرعة الانترنت ...'
    });
  
    this.loading.present();
  
  }

}
