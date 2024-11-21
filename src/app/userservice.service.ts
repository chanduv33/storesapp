import { Injectable } from '@angular/core';
import { HttpClient, HttpInterceptor, HttpRequest, HttpHandler, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class UserserviceService {
  backendURL = 'http://localhost:8081/security-service';
  cartURL = 'http://localhost:8081/cart-service';
  orderURL = 'http://localhost:8081/order-service';
  userId = null;
  orderId = null;
  cartedItems;
  deliveredOn = null;
  selectedProduct;
  selectedUser;
  selectedItems;
  itemCount = 0;
  itemId = null;
  constructor(public http: HttpClient) { }
  registerRequest(data) {
    console.log('service', data);
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
      .set('Accept', 'application/json');
    return this.http.post(`${this.backendURL}/User/register`, data, { headers: headers });
  }

  loginRequest(user): Observable<HttpResponse<object>> {

    return this.http.post(`http://localhost:8081/login`, user, { observe: 'response' });
  }

  getAuthToken() {
    return localStorage.getItem('token');
  }
  getAuthenticatedUser() {
    return localStorage.getItem('authenticatedUser');
  }

  getMyOrders(): any {
    this.userId = localStorage.getItem('userId');
    return this.http.get(`${this.orderURL}/Order`, { params: { userId: this.userId } });
  }

  removeManufacturer(user): any {
    this.userId = user.userId;
    return this.http.get(`${this.backendURL}/User`, { params: { userId: this.userId } });
  }

  logoutRequest(): any {
    return this.http.get(`http://localhost:8080/logout`);
  }

  setDate(order): any {
    // tslint:disable-next-line: max-line-length
    console.log(order);
    this.orderId = order.orderId;
    this.deliveredOn = order.deliveredOn;
    return this.http.get(`${this.backendURL}/Order/deliveredOn`, { params: { orderId: this.orderId, deliveredOn: this.deliveredOn } });
  }

  getAllManufacturers(): any {
    return this.http.get(`http://localhost:8081/user-service/User?role=MANUFACTURER`);
  }

  updateMan(user): any {
    return this.http.put(`http://localhost:8081/user-service/User`, user);
  }

  addItemToCart(item): any {
    this.userId = localStorage.getItem('userId');
    return this.http.post(`${this.cartURL}/Cart/`, item);
  }

  getCartItems(): any {
    this.userId = localStorage.getItem('userId');
    return this.http.get(`${this.cartURL}/Cart`, { params: { userId: this.userId } });
  }

  removeCartItem(item): any {
    this.itemId = item.itemId;
    return this.http.delete(`${this.backendURL}/Cart/${this.itemId}`);
  }
}
