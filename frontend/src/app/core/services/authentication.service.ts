import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {


  private apiUrl: string = environment.apiUrl;
  private ACCESS_TOKEN = "ACCESS_TOKEN";
  private REFRESH_TOKEN = "REFRESH_TOKEN";

  constructor(private http: HttpClient, private router: Router) { }

  getAccessToken() { return localStorage.getItem(this.ACCESS_TOKEN) || ""; }

  getRefreshToken() { return localStorage.getItem(this.REFRESH_TOKEN) || ""; }

  setAccessToken(token: string) { localStorage.setItem(this.ACCESS_TOKEN, token); }

  setRefreshToken(token: string) { localStorage.setItem(this.REFRESH_TOKEN, token); }

  setAccessRefreshTokens(tokens: any) {
    this.setAccessToken(tokens.access);
    this.setRefreshToken(tokens.refresh);
  }

  logout(message?: string) {
    localStorage.removeItem(this.ACCESS_TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);
    this.router.navigate(['/']);

    if (message == null) {
      // message = "Wylogowano pomyślnie";
    }

    // Show logout message
    // this.snackBar.openFromComponent(CustomSnackBarComponent, {
    //   data: {
    //     content: message
    //   }
    // });
  }

  refreshToken() {
    return this.http.post(`${this.apiUrl}api/token/refresh/`, {
      'refresh': this.getRefreshToken()
    }).pipe(tap((tokens: any) => {
      this.setAccessToken(tokens.access);
    }, err => {
      //console.log(err);
    }));
  }

  login(formData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}api/token/`, formData).pipe(map((res: any) => {
      this.setAccessRefreshTokens(res);
      return res;
    }, (err: any) => {
      return err;
    }
    ));
  }

  /**
   * Calls API to check if user is still logged in.
   * Checks if user data can be retrieved.
   */
  userIsAuthenticated(): Observable<any> {
    return this.http.get(`${this.apiUrl}core/whoami/`).pipe(map((res: any) => {
      this.router.navigate(['/nav/dashboard']);
      return res;
    }, (err: any) => {
      return err;
    }));
  }

}
