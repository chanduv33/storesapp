import { Component, OnInit } from '@angular/core';
import { Product } from '../Product';
import { ManufacturerserviceService } from '../manufacturerservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-get-products',
  templateUrl: './get-products.component.html',
  styleUrls: ['./get-products.component.css']
})
export class GetProductsComponent implements OnInit {
  products: Product[];
  role = null;
  constructor(public service: ManufacturerserviceService, public router: Router) { }

  ngOnInit() {
    this.getProducts();
    this.role = JSON.parse(localStorage.getItem('user')).role;
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
