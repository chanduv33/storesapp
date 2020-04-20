import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ManufacturerserviceService {
  backendURL = 'http://3.22.205.236:8080/template';
  selectedProduct;
  userId = null;  
  productId = null;
  constructor(public http: HttpClient) { }

  addProduct(data) {
    console.log(data);
    return this.http.post(`${this.backendURL}/addprod`, data);
  }

  getAllProducts(): any {
    console.log(JSON.parse(localStorage.getItem('user')).userId);
    this.userId = JSON.parse(localStorage.getItem('user')).userId;
    return this.http.get(`${this.backendURL}/getAllProducts`, { params: { userId: this.userId}});
  }
getPaymentDetails(): any {
  this.userId = JSON.parse(localStorage.getItem('user')).userId;
  return this.http.get(`${this.backendURL}/getPayments`, { params: { userId: this.userId}});
}


removeProduct(product): any {
  console.log(product);
  this.productId = product.productId;
  return this.http.get(`${this.backendURL}/removeProd`, { params: { productId: this.productId}});
}

changeStatusOfProd(order): any {
  console.log(order);
  return this.http.put(`${this.backendURL}/changeStatus`,order);
}

  updateProduct(data) {
    return this.http.put(`${this.backendURL}/updateProd`, data);
  }

  setCostPrice(data): any {
    return this.http.put(`${this.backendURL}/updateCost`, data);
  }

}
