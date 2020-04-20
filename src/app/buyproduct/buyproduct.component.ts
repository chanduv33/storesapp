import { Component, OnInit } from '@angular/core';
import { CustomerserviceService } from '../customerservice.service';
import { Router } from '@angular/router';
import { User } from '../User';

@Component({
  selector: 'app-buyproduct',
  templateUrl: './buyproduct.component.html',
  styleUrls: ['./buyproduct.component.css']
})
export class BuyproductComponent implements OnInit {
 user: User;
 role = null;
 statusCode = null;
  resp: any;
  availableQuantity = null;
  selProduct: any;
  constructor(public service: CustomerserviceService, public router: Router) { }

  ngOnInit() {
    this.availableQuantity = this.service.selectedProduct.quantity;
    this.selProduct = this.service.selectedProduct;
    console.log(this.availableQuantity);
  }

  placeaorder(form) {
    console.log(form.value);
    this.user = JSON.parse(localStorage.getItem('user'));
    this.role = JSON.parse(localStorage.getItem('user')).role;

    if (this.availableQuantity > this.service.selectedProduct.quantity) {
      this.user.dealersProds = [
        form.value
      ];
      this.router.navigateByUrl('/pay');
    } else {
      this.availableQuantity = null;
      this.service.selectedProduct = this.selProduct;
    }
  }

}
