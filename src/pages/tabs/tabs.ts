import { Component } from '@angular/core';
import { ContactPage } from '../contacts/contact/contact';
import { HomePage } from '../home/home';
import { ProfilePage } from '../Profiles/profile/profile';
import { MapPage } from '../Maps/map/map';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  public hideTabs:boolean = false;
  tab1Root = HomePage;
  tab2Root = MapPage;
  tab3Root = ContactPage;
  tab4Root = ProfilePage;

  constructor() {

  }
}
