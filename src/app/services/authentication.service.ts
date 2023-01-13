import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { JwtService } from './jwt.service';
import { User } from '../Models/Identity/user';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

  private StorageKey = 'token';
  private userSubject: BehaviorSubject<User>;
  private userObservable: Observable<User>;

  constructor(private http: HttpClient, private tokenService: JwtService) {
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem(this.StorageKey)!));
    this.userObservable = this.userSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.userSubject.value;
  }

  public get currentUserObservable(): Observable<User> {
    return this.userObservable;
  }

  public logout(): void {
    localStorage.removeItem(this.StorageKey);
    this.userSubject.next(null!);
  }

  public login(username: string, password: string): Observable<User> {
    var url = `${environment.apiUrl}/Authentication/Login`;
    return this.http.post(url, { "userData": username, "password": password }, {responseType: 'text'})
    .pipe(map(result => {

      var user = this.tokenService.decode(result);

      if (user != null && user.Token) {
        localStorage.setItem(this.StorageKey, JSON.stringify(user));
        this.userSubject.next(user);
      }

      return user;
    }));
  }
}