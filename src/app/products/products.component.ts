import { Component, OnInit } from '@angular/core';
import { Product } from '../Product';
import { ManufacturerserviceService } from '../manufacturerservice.service';
import { Router } from '@angular/router';
import { DealerserviceService } from '../dealerservice.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[];
  role = null;
  constructor(public service: ManufacturerserviceService, public router: Router) { }
  ngOnInit() {
    this.getProducts();
    this.role = localStorage.getItem('role');
  }
  getProducts() {
    this.service.getAllProducts().subscribe(resp => {
      console.log(resp);
      console.log(resp.products);
      this.products = resp.products;
      console.log('product component', this.products);
    }, err => {
      console.log(err);
      this.router.navigateByUrl('/unauth');
    }, () => {
      console.log('get request is sent');
    });
  }

  selectedProduct(product) {
    console.log(product);
    this.service.selectedProduct = product;
    console.log(this.service.selectedProduct);
    this.router.navigateByUrl('/updateproduct');
  }

  setCost(product) {
    console.log(product);
    this.service.selectedProduct = product;
    console.log(this.service.selectedProduct);
    this.router.navigateByUrl('/setcost');
  }

}

