import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../User';
import { CustomerserviceService } from '../customerservice.service';
import { Products } from '../Products';
import { DealerserviceService } from '../dealerservice.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  status= null;
  amount=null;
  resp:any;
  statusCode= null;
  product: any;
  user:User;
  dealersProd:any;
  products: Products;
  constructor(public service: CustomerserviceService, public router: Router,public dservice: DealerserviceService) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    if (this.user.role === 'ROLE_CUSTOMER') { 
      this.amount=this.service.selectedProduct.sellingPrice*this.service.selectedProduct.quantity;
    }
    if ( this.user.role === 'ROLE_DEALER' ) {
      this.amount=this.dservice.costProd.quantity*this.dservice.costProd.productCost;
     }
  }

  pay(form) {
    console.log(form.value);
    if (this.user.role === 'ROLE_CUSTOMER') {
      this.dealersProd = this.service.selectedProduct;
      this.user.dealersProds = [
        this.dealersProd
      ];
      this.user.orders = [
        {
          orderId: null,
          status: null,
          paymentType: 'OnlinePayment'
        }
      ];
      console.log(this.user);
      this.service.placeOrder(this.user).subscribe((resp: any) => {
        console.log('backend response', resp);
        this.resp = resp;
        this.statusCode = this.resp.statusCode ;
        if (this.resp.statusCode === 201) {
          this.router.navigateByUrl('/payment');
        }
      }, (err: any) => {
        console.log(err);
        console.log(' request is gone');
      });
    }
    if ( this.user.role === 'ROLE_DEALER' ) {
      console.log(this.dservice.costProd);
      this.product= this.dservice.costProd;
      console.log(this.product);
      this.products = {
        sellingPrice: 0,
         product : {
           productId :  this.product.productId,
           imageUrl: this.product.imageUrl,
           productName: this.product.productName,
           productCost: this.product.productCost,
           description: this.product.description,
           quantity: this.product.quantity
         }
       };
      this.user.dealersProds = [
       this.products
      ];
      this.user.orders = [
        {
          orderId: null,
          status: null,
          paymentType: 'OnlinePayment'
        }
      ];
      console.log(this.user);
      this.dservice.placeOrder(this.user).subscribe(resp => {
          console.log('backend response', resp);
          this.resp = resp;
          this.statusCode = this.resp.statusCode ;
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
    if (this.user.role === 'ROLE_CUSTOMER') {
    this.dealersProd = this.service.selectedProduct;
    this.user.dealersProds= [
      this.dealersProd
    ]
    this.user.orders = [
      {
        orderId: null,
        status: null,
        paymentType: 'CashOnDelivery'
      }
    ];
    console.log(this.user);
    this.service.placeOrder(this.user).subscribe((resp: any) => {
      console.log('backend response', resp);
      this.resp = resp;
      this.statusCode = this.resp.statusCode ;
      if (this.resp.statusCode === 201) {
        this.router.navigateByUrl('/payment');
      }
    }, (err: any) => {
      console.log(err);
      console.log(' request is gone');
    });
  }
    if ( this.user.role === 'ROLE_DEALER' ) {
      console.log(this.dservice.costProd);
      this.product= this.dservice.costProd;
      console.log(this.product);
      this.products = {
        sellingPrice: 0,
         product : {
           productId :  this.product.productId,
           imageUrl: this.product.imageUrl,
           productName: this.product.productName,
           productCost: this.product.productCost,
           description: this.product.description,
           quantity: this.product.quantity
         }
       };
    this.user.dealersProds = [
     this.products
    ];
    this.user.orders = [
      {
        orderId: null,
        status: null,
        paymentType: 'CashOnDelivery'
      }
    ];
    console.log(this.user);
    this.dservice.placeOrder(this.user).subscribe((resp: any) => {
        console.log('backend response', resp);
        this.resp = resp;
        this.statusCode = this.resp.statusCode ;
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
