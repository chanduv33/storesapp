import { Injectable } from '@angular/core';
import { HttpClient, HttpInterceptor, HttpRequest, HttpHandler, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})


export class UserserviceService  {
  backendURL = 'http://52.14.132.191:8080/template';
  userId = null;
  orderId = null;
  cartedItems;
  deliveredOn = null;
  selectedProduct;
  selectedUser;
  selectedItems;
  itemCount = 0;
  itemId = null;
  constructor(public http: HttpClient) {}
  registerRequest(data) {
    console.log('service', data);
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
    .set('Accept', 'application/json');
    return this.http.post(`${this.backendURL}/register`, data, {headers: headers});
  }

  loginRequest(user): any {
    let basicAuthHeaderString = 'Basic ' + window.btoa(user.username + ':' + user.password);

    let headers = new HttpHeaders( {
      Authorization: basicAuthHeaderString
    } );

    return this.http.post(`http://52.14.132.191:8080/login`, user, { headers: headers}).pipe(
      map(
        data => {
          localStorage.setItem('token', basicAuthHeaderString);
          localStorage.setItem('authenticatedUser',user.username);
          return data;
        }
      )
    );
  //  return this.http.post(`${this.backendURL}/login`, data);
  }
  // loginRequest(username,password): any {
  //   const basicAuthHeaderString = 'Basic ' + window.btoa(username + ':' + password);

  //   const headers = new HttpHeaders( {
  //     Authorization: basicAuthHeaderString
  //   } )

  //   return this.http.post(`${this.backendURL}/login`, {headers}).pipe(
  //     map(
  //       data => {
  //         localStorage.setItem('token', basicAuthHeaderString);
  //         localStorage.setItem('authenticatedUser',username);
  //         return data;
  //       }
  //     )
  //   );
  // //  return this.http.post(`${this.backendURL}/login`, data);
  // }

  getAuthToken() {
    return localStorage.getItem('token');
  }
  getAuthenticatedUser() {
    return localStorage.getItem('authenticatedUser');
  }

  getMyOrders(): any {
    this.userId = JSON.parse(localStorage.getItem('user')).userId;
    return this.http.get(`${this.backendURL}/getMyOrders`, { params: { userId: this.userId}});
  }

  removeManufacturer(user): any {
    this.userId = user.userId;
    return this.http.get(`${this.backendURL}/deleteMan`, { params: { userId: this.userId}});
  }

  logoutRequest(): any {
    return this.http.get(`http://52.14.132.191:8080/logout`);
  }

  setDate(order): any {
    // tslint:disable-next-line: max-line-length
    console.log(order);
    this.orderId = order.orderId;
    this.deliveredOn = order.deliveredOn;
    return this.http.get(`${this.backendURL}/deliveredOn`, { params: { orderId: this.orderId, deliveredOn : this.deliveredOn}});
  }

  getAllManufacturers(): any {
   this.selectedUser = localStorage.getItem('authenticatedUser');
   let basicAuthHeaderString = 'Basic ' + window.btoa(this.selectedUser.username + ':' + this.selectedUser.password);
   const headers = new HttpHeaders( {
      Authorization: basicAuthHeaderString
    } );
   return this.http.get(`${this.backendURL}/getAllMans`, { headers});
  }

  updateMan(user): any {
    return this.http.post(`${this.backendURL}/updateMan`, user);
  }

  addItemToCart(user): any {
    return this.http.post(`${this.backendURL}/addtocart`, user);
  }

  getCartItems(): any {
    this.userId = JSON.parse(localStorage.getItem('user')).userId;
    return this.http.get(`${this.backendURL}/getItems`, { params: { userId: this.userId}});
  }

  removeCartItem(item): any {
    this.itemId = item.itemId;
    return this.http.get(`${this.backendURL}/remItem`, { params: { itemId: this.itemId}});
  }
}
