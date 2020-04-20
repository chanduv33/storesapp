import { Component, OnInit } from '@angular/core';
import { DealerserviceService } from '../dealerservice.service';
import { Router } from '@angular/router';
import { User } from '../User';
import { Products } from '../Products';

@Component({
  selector: 'app-placeorder',
  templateUrl: './placeorder.component.html',
  styleUrls: ['./placeorder.component.css']
})
export class PlaceorderComponent implements OnInit {
  user: User;
  role = null;
  availableQuantity = null;
  products: Products;
  selProduct: any;
  statusCode = null;
  resp: any;
  constructor(public service: DealerserviceService, public router: Router) { }

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
      this.service.costProd=this.selProduct;
     this.router.navigateByUrl('/pay');
    } else {
      this.availableQuantity = null;
      this.service.selectedProduct = this.selProduct;
    }
  }
}
