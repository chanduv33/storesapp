import { Injectable } from '@angular/core';
//import { HttpClientService } from './http-client.service';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(
    private httpClient:HttpClient
  ) { 
     }

  authenticate(username, password): any {
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    return this.httpClient.get('http://3.22.205.236:8080/basicauth',{headers}).pipe(
     map(
       userData => {
        sessionStorage.setItem('username',username);
        return userData;
       }
     )

    );
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem('username')
    console.log(!(user === null))
    return !(user === null)
  }

  logOut() {
    sessionStorage.removeItem('username')
  }
}
