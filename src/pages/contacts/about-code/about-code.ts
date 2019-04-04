import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';

/**
 * Generated class for the AboutCodePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-about-code',
  templateUrl: 'about-code.html',
})
export class AboutCodePage {

  loading: any;


  constructor(public navCtrl: NavController, public navParams: NavParams,public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    this.showLoader();
    console.log('ionViewDidLoad AboutCodePage');
    this.loading.dismiss();
  }

  showLoader(){
 
    this.loading = this.loadingCtrl.create({
        content: 'يرجى الانتظار يعتمد على سرعة الانترنت ...'
    });
  
    this.loading.present();
  
  }


}
