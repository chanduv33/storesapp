import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomerserviceService {
  backendURL = 'http://localhost:8080';
  selectedProduct;
  constructor(public http: HttpClient) { }

  getAllProducts(): any {
    return this.http.get(`${this.backendURL}/getDealerProds`);
  }

  placeOrder(data): any {
    console.log(data);
    return this.http.post(`${this.backendURL}/buyProduct`, data);
  }

}
