import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductsComponent } from './products/products.component';
import { ManufacturerserviceService } from './manufacturerservice.service';

@Injectable({
  providedIn: 'root'
})
export class DealerserviceService {
  backendURL = 'http://3.22.205.236:8080/template';
  userId = null;
  selectedProduct;
  costProd;
  constructor(public http: HttpClient) {

   }

   updateDealerProduct(product): any {
     console.log(product);
     return this.http.post(`${this.backendURL}/updateDealerProduct`, product);
   }

   getAllMansProducts(): any {
     return this.http.get(`${this.backendURL}/getMansProds`);
   }

   placeOrder(data): any {
     console.log(data);
     return this.http.post(`${this.backendURL}/dealerOrder`, data);
   }

   getProducts(): any {
    this.userId = JSON.parse(localStorage.getItem('user')).userId;
    return this.http.get(`${this.backendURL}/getProds`, { params: { userId: this.userId}});
  }

  setSellingPrice(data): any {
    return this.http.post(`${this.backendURL}/setSellingPrice`, data);
  }

}
