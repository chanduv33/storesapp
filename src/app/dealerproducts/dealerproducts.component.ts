import { Component, OnInit } from '@angular/core';
import { Products } from '../Products';
import { DealerserviceService } from '../dealerservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dealerproducts',
  templateUrl: './dealerproducts.component.html',
  styleUrls: ['./dealerproducts.component.css']
})
export class DealerproductsComponent implements OnInit {
  products: Products[];
  constructor(public service: DealerserviceService, public router: Router) { }

  ngOnInit() {
    this.getProducts();
  }
  getProducts() {
    this.service.getProducts().subscribe(resp => {
      console.log(resp.dealerProds);
      this.products = resp.dealerProds;
      console.log('product component', this.products);
    }, err => {
      console.log(err);
      this.router.navigateByUrl('/unauth');
    }, () => {
      console.log('get request is sent');
    });
  }

    updatableProduct(product) {
    console.log(product);
    this.service.selectedProduct = product;
    console.log(this.service.selectedProduct);
    this.router.navigateByUrl('/updatedealerprod');
  }

  setPrice(product) {
    console.log(product);
    this.service.selectedProduct = product;
    console.log(this.service.selectedProduct);
    this.router.navigateByUrl('/setprice');
  }

}
