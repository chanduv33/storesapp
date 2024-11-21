import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomerserviceService {
  productURL = 'http://localhost:8081/product-service';
  cartURL = 'http://localhost:8081/cart-service';
  orderURL = 'http://localhost:8081/order-service';
  selectedProduct;
  constructor(public http: HttpClient) { }

  getAllProducts(): any {
    return this.http.get(`${this.productURL}/Product/Dealer/All`);
  }

  getCartItems(userId: string): any {
    return this.http.get(`${this.cartURL}/Cart`, { params: { userId: localStorage.getItem('userId') } });
  }

  placeOrder(data): any {
    console.log(data);
    const userID = localStorage.getItem('userId');
    return this.http.post(`${this.orderURL}/Order`, data, { params: { userId: userID } });
  }

}
