import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { User } from '../../Models/Identity/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() user!: User;
  @Input() isUserAuthenticated?: boolean;
  public nickName!: string;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {}

  public logout(): void {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  public getNickName() {
    if (this.isUserAuthenticated) {
      this.nickName =
        '<span>' +
        `${this.user.UserName}` +
        '</span>' +
        '<br/>' +
        '<strong>' +
        `${this.user.Role}` +
        '</strong>';
    }
    return this.nickName;
  }
}
