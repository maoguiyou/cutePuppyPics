import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { MenuComponent } from '../../shared/menu-component/menu-component';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = MenuComponent;
  tab2Root: any = AboutPage;
  tab3Root: any = ContactPage;
  tab4Root: any = HomePage;
  constructor() {

  }
}
