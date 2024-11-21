import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../User';
import { CustomerserviceService } from '../customerservice.service';
import { Products } from '../Products';
import { DealerserviceService } from '../dealerservice.service';
import { Orders } from '../Orders';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  status = null;
  amount = null;
  resp: any;
  statusCode = null;
  product: any;
  user: User;
  dealersProd: any;
  products: Products;
  orderToPlace: Orders;
  role: string;
  constructor(public service: CustomerserviceService, public router: Router, public dservice: DealerserviceService) { }

  ngOnInit() {
    this.role = localStorage.getItem('role');
    if (this.role === 'ROLE_CUSTOMER') {
      this.amount = this.service.selectedProduct.sellingPrice * this.service.selectedProduct.quantity;
    }
    if (this.role === 'ROLE_DEALER') {
      this.amount = this.dservice.costProd.quantity * this.dservice.costProd.productCost;
    }
  }

  pay(form) {
    console.log(form.value);
    if (this.role === 'ROLE_CUSTOMER') {
      this.dealersProd = this.service.selectedProduct;
      // this.user.dealersProds = [
      //   this.dealersProd
      // ];
      this.orderToPlace = {
        id: null,
        status: null,
        paymentType: 'OnlinePayment',
        productId: this.service.selectedProduct.dealersProductId,
        amount: this.amount,
        quantity: this.service.selectedProduct.quantity,
        isCartItem: this.service.selectedProduct.isCartItem
      };
      console.log(this.user);
      this.service.placeOrder(this.orderToPlace).subscribe((resp: any) => {
        console.log('backend response', resp);
        this.resp = resp;
        this.statusCode = this.resp.statusCode;
        if (this.resp.statusCode === 201) {
          this.router.navigateByUrl('/payment');
        }
      }, (err: any) => {
        console.log(err);
        console.log(' request is gone');
      });
    }
    if (this.role === 'ROLE_DEALER') {
      console.log(this.dservice.costProd);
      this.product = this.dservice.costProd;
      console.log(this.product);
      this.products = {
        sellingPrice: 0,
        quantity: this.product.quantity,
        productId: this.product.id,
        imageUrl: this.product.imageUrl

      };
      // this.user.dealersProds = [
      //   this.products
      // ];
      this.orderToPlace = {
        id: null,
        status: null,
        paymentType: 'OnlinePayment',
        amount: this.product.productCost,
        quantity: this.product.quantity,
        productId: this.product.productId,
        isCartItem: this.product.isCartItem
      };

      console.log(this.user);
      this.dservice.placeOrder(this.orderToPlace).subscribe(resp => {
        console.log('backend response', resp);
        this.resp = resp;
        this.statusCode = this.resp.statusCode;
        if (this.resp.statusCode === 201) {
          this.router.navigateByUrl('/pay');
        }
      }, err => {
        console.log(err);
        this.router.navigateByUrl('/unauth');
      }, () => {
        console.log(' request is sent');
      });

    }
    /**/

  }

  order() {
    if (this.role === 'ROLE_CUSTOMER') {
      this.dealersProd = this.service.selectedProduct;
      // this.user.dealersProds = [
      //   this.dealersProd
      // ];
      this.orderToPlace = {
        id: null,
        status: null,
        paymentType: 'CashOnDelivery',
        productId: this.service.selectedProduct.dealersProductId,
        amount: this.amount,
        quantity: this.service.selectedProduct.quantity,
        isCartItem: this.service.selectedProduct.isCartItem
      };
      console.log(this.user);
      this.service.placeOrder(this.orderToPlace).subscribe((resp: any) => {
        console.log('backend response', resp);
        this.resp = resp;
        this.statusCode = this.resp.statusCode;
        if (this.resp.statusCode === 201) {
          this.router.navigateByUrl('/payment');
        }
      }, (err: any) => {
        console.log(err);
        console.log(' request is gone');
      });
    }
    if (this.role === 'ROLE_DEALER') {
      console.log(this.dservice.costProd);
      this.product = this.dservice.costProd;
      console.log(this.product);
      this.products = {
        productId: this.product.id,
        imageUrl: this.product.imageUrl,
        productName: this.product.productName,
        sellingPrice: 0,
        quantity: this.product.quantity
  };
      // this.user.dealersProds = [
      //   this.products
      // ];
      this.orderToPlace = {
        id: null,
        status: null,
        paymentType: 'CashOnDelivery',
        amount: this.product.productCost,
        quantity: this.product.quantity,
        productId: this.product.productId,
        isCartItem: this.product.isCartItem
      };
      console.log(this.user);
      this.dservice.placeOrder(this.orderToPlace).subscribe((resp: any) => {
        console.log('backend response', resp);
        this.resp = resp;
        this.statusCode = this.resp.statusCode;
        if (this.resp.statusCode === 201) {
          this.router.navigateByUrl('/payment');
        }
      }, (err: any) => {
        console.log(err);
        this.router.navigateByUrl('/unauth');
      }, () => {
        console.log(' request is sent');
      });
    }
  }
}
