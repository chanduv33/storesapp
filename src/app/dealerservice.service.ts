import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductsComponent } from './products/products.component';
import { ManufacturerserviceService } from './manufacturerservice.service';

@Injectable({
  providedIn: 'root'
})
export class DealerserviceService {
  backendURL = 'http://localhost:8081/product-service';
  userId = null;
  selectedProduct;
  costProd;
  constructor(public http: HttpClient) {

  }

  updateDealerProduct(product): any {
    console.log(product);
    return this.http.post(`${this.backendURL}/Product`, product);
  }

  getAllMansProducts(): any {
    return this.http.get(`http://localhost:8081/product-service/Products`);
  }

  placeOrder(data): any {
    console.log(data);
    this.userId = localStorage.getItem('userId');
    return this.http.post(`${this.backendURL}/Order`, data, { params: { userId: this.userId } });
  }

  getProducts(): any {
    this.userId = localStorage.getItem('userId');
    return this.http.get(`${this.backendURL}/Products`, { params: { userId: this.userId } });
  }

  setSellingPrice(data): any {
    const userID = localStorage.getItem('userId');
    return this.http.post(`${this.backendURL}/Product/Price`, data, { params: { userId: userID } });
  }

}
