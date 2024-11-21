import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ManufacturerserviceService {
  backendURL = 'http://localhost:8081/product-service';
  cartURL = 'http://localhost:8084/cart-service';
  selectedProduct;
  userId = null;
  productId = null;
  constructor(public http: HttpClient) { }

  addProduct(data, file) {
    const reqBody: FormData = new FormData();
    reqBody.append('file', file);
    const userBlob = new Blob([JSON.stringify(data)], { type: 'application/json' });
    reqBody.append('user', userBlob);
    // reqBody.append('user', JSON.stringify(data));
    console.log(data);
    console.log(reqBody.getAll);
    console.log(reqBody.get('user'));
    console.log(reqBody);
    return this.http.post(`${this.backendURL}/Product`, reqBody);
  }

  getAllProducts(): any {
    console.log(localStorage.getItem('userId'));
    this.userId = localStorage.getItem('userId');
    return this.http.get(`${this.backendURL}/Products`, { params: { userId: this.userId } });
  }


  getPaymentDetails(): any {
    this.userId = localStorage.getItem('userId');
    return this.http.get(`${this.backendURL}/Orders/Payments`, { params: { userId: this.userId } });
  }


  removeProduct(product): any {
    console.log(product);
    this.productId = product.productId;
    return this.http.delete(`${this.backendURL}/Product/${product.productId}`);
  }

  changeStatusOfProd(order): any {
    console.log(order);
    return this.http.put(`http://localhost:8000/security-service/Order/changeStatus`, order);
  }

  updateProduct(data) {
    return this.http.put(`${this.backendURL}/Product`, data, { params: { transactionType: 'UPDATE_DETAILS' } });
  }

  setCostPrice(data): any {
    return this.http.put(`${this.backendURL}/Product`, data);
  }

}
