import { JwtHelperService } from '@auth0/angular-jwt';
import { Injectable } from '@angular/core';
import { Session } from '../Models/Identity/session';
import { User } from '../Models/Identity/user';



@Injectable({
  providedIn: 'root'
})
export class JwtService {

  private jwt: JwtHelperService;

  constructor() {
    this.jwt = new JwtHelperService();
  }

  public decode(token: string): User {
    try {
      var payload = this.jwt.decodeToken(token);

      var user = new User();
      user.Id = payload.primarysid;
      user.UserName = payload.unique_name;
      user.Email = payload.email;
      user.Role = payload.role;
      user.Apellidos = payload.LastName;
      user.Permisions = [];
      user.Token = this.getToken(token, payload);
      return user;
    } catch (error) {
      return null!;
    }
  }

  private getToken(token: String, payload: any): Session {
    var exp = new Date(parseInt(payload.exp) * 1000);
    var iat = new Date(parseInt(payload.iat) * 1000);
    var isValid = exp >= new Date();
    var result = new Session();
    result.Id = token;
    result.IsValid = isValid;
    result.Expires = exp;
    result.Issued = iat;

    return result;
  }
}
