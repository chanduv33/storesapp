import { Injectable } from '@angular/core';
//import { HttpClientService } from './http-client.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(
    private httpClient: HttpClient
  ) {
  }

  // authenticate(username, password): any {
  //   const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
  //   return this.httpClient.get('http://localhost:8080/basicauth',{headers}).pipe(
  //    map(
  //      userData => {
  //       sessionStorage.setItem('username',username);
  //       return userData;
  //      }
  //    )

  //   );
  // }

  isUserLoggedIn() {
    const role = sessionStorage.getItem('role');
    console.log(!(role === null));
    return !(role === null);
  }

  logOut() {
    sessionStorage.removeItem('role');
  }
}
