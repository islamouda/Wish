import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { FIREBASE_CONFIG } from '../app/app.firebase.config';

import { AngularFireModule }  from 'angularfire2';
import { AngularFireAuthModule }  from 'angularfire2/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { Camera } from '@ionic-native/camera';
import { IonicStorageModule } from '@ionic/storage';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


import { ContactPage } from '../pages/contacts/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { LoginPage } from '../pages/auth/login/login';
import { RegisterPage } from '../pages/auth/register/register';
import { ProfilePage } from '../pages/Profiles/profile/profile';
import { ProfileAddPage } from '../pages/Profiles/profile-add/profile-add';
import { ProfileEditPage } from '../pages/Profiles/profile-edit/profile-edit';
import { ProfileWishEditPage } from '../pages/Profiles/profile-wish-edit/profile-wish-edit';
import { WishAddPage } from '../pages/Wishs/wish-add/wish-add';
import { WishAchievedPage } from '../pages/Wishs/wish-achieved/wish-achieved';
import { WishServiceProvider } from '../providers/wish-service/wish-service';
import { WishShowPage } from '../pages/Wishs/wish-show/wish-show';

import { SocialSharing } from '@ionic-native/social-sharing';
import { MapPage } from '../pages/Maps/map/map';
import { MapAddPage } from '../pages/Maps/map-add/map-add';
import { MapEditPage } from '../pages/Maps/map-edit/map-edit';
import { MapServiceProvider } from '../providers/map-service/map-service';
import { AboutTeamPage } from '../pages/contacts/about-team/about-team';
import { AboutCodePage } from '../pages/contacts/about-code/about-code';
import { AboutApplicationPage } from '../pages/contacts/about-application/about-application';


@NgModule({
  declarations: [
    MyApp,

    ContactPage,
    HomePage,
    TabsPage,
  
    LoginPage,
    RegisterPage,
    ProfilePage,
    ProfileAddPage,
    ProfileEditPage,
    ProfileWishEditPage,
    WishAddPage,
    WishAddPage,
    WishAchievedPage,
    WishShowPage,

    MapPage,
    MapAddPage,
    MapEditPage,
    AboutTeamPage,
    AboutCodePage,
    AboutApplicationPage,
 

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,

    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    RegisterPage,
    ProfilePage,
    ProfileAddPage,
    ProfileEditPage,
    ProfileWishEditPage,
    WishAddPage,
    WishAddPage,
    WishAchievedPage,
    WishShowPage,
 
    MapPage,
    MapAddPage,
    MapEditPage,
    AboutTeamPage,  
    AboutCodePage,
    AboutApplicationPage,
 

  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Camera,
    WishServiceProvider,
    SocialSharing,
    MapServiceProvider,
    
  ]
})
export class AppModule {}
