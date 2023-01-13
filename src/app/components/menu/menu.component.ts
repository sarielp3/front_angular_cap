import { Component, OnInit, Input } from '@angular/core';
import {
  faHouseUser,
  faHamburger,
  faUtensils,
  faCoins,
  faReceipt,
  faBars
} from '@fortawesome/free-solid-svg-icons';
import { User } from 'src/app/Models/Identity/user';
import { NavItem } from '../../models/navbar';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  @Input() isAdmin?: boolean;
  @Input() user?: User;
  navitems: NavItem[] = [];
  navbarOpen = false;

  faHouseUser = faHouseUser;
  faHamburger = faHamburger;
  faUtensils = faUtensils;
  faCoins = faCoins;
  faReceipt = faReceipt;
  faBars = faBars;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.navitems.map(m => (m.active = m.route == event.url));
        this.navbarOpen = true;
      }
    });
  }

  ngOnInit(): void {
    this.navitems.push({
      active: false,
      icon: faHouseUser,
      route: '/home',
      text: 'Home',
    });
  }

  changeClass(item : any) {
    this.navitems.map(m => (m.active = false));
    item.active = !item.active;
  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }
}
