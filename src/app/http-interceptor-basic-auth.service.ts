import { Injectable } from '@angular/core';
import { UserserviceService } from './userservice.service';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorBasicAuthService implements HttpInterceptor {

  constructor(public service : UserserviceService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let basicAuthHeaderString = localStorage.getItem('token');
    let username =  localStorage.getItem('authenticatedUser');
    if(basicAuthHeaderString && username ){
     req = req.clone({
       setHeaders: {
         Authorization : basicAuthHeaderString
       }
     })
    }
    return next.handle(req);
  }
}
