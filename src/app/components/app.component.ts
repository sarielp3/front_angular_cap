import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from '../Models/Identity/role';
import { User } from '../Models/Identity/user';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public isCollapse = false;
  public currentUser!: User;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUserObservable.subscribe(result => {
      this.currentUser = result;
      console.log('user', this.currentUser);
    });
  }

  public toggleSidebar(): void {
    this.isCollapse = !this.isCollapse;
  }

  public hideMenuIfNecesary() {
    if (this.isCollapse) {
      this.toggleSidebar();
    }
  }

  public isUserAuthenticated(): boolean {
    var existsAutthentication = this.currentUser != null;

    if (!existsAutthentication && this.isCollapse == true) {
      this.isCollapse = false;
    }

    return existsAutthentication;
  }

  public isAdministrator(): boolean {
    return (
      this.currentUser != null && this.currentUser.Role == Role.Administrator
    );
  }
}
