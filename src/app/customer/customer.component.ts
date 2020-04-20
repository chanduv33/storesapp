import { Component, OnInit } from '@angular/core';
import { CustomerserviceService } from '../customerservice.service';
import { Router } from '@angular/router';
import { Products } from '../Products';
import { UserserviceService } from '../userservice.service';
import { Cart } from '../Cart';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  products: Products[];
  quantity= 0;
  user: any;
  existingItems: Cart[];
  constructor(public service: CustomerserviceService, public router: Router, public uservice: UserserviceService) { }

  ngOnInit() {
     this.existingItems = JSON.parse(localStorage.getItem('user')).items;
    console.log(this.existingItems);
    this.getAllProducts();
  }
  getAllProducts() {
    this.service.getAllProducts().subscribe(resp => {
      console.log(resp.dealerProds);
      this.products = resp.dealerProds;
      this.existingItems  = JSON.parse(localStorage.getItem('user')).items;
      console.log(this.existingItems);
      console.log('product component', this.products);
    }, err => {
      console.log(err);
      this.router.navigateByUrl('/unauth');
    }, () => {
      console.log('get request is sent');
    });
}

buyProduct(product) {
  this.service.selectedProduct = product;
  this.router.navigateByUrl('buyProduct');
}

addToCart(product) {
  this.user = JSON.parse(localStorage.getItem('user'));
  if (this.checkItems(product)) {
    return false;
  } else {
  this.quantity = Number(window.prompt('Enter number of items'));
  console.log(this.quantity);
  if (this.quantity === 0){
    return;
  }
  this.user.items = [
    {
      itemProductId : product.dealersProductId,
      quantity: this.quantity
    }
  ];
  this.uservice.addItemToCart(this.user).subscribe(resp => {
    console.log(resp);
    this.existingItems.push(product);
    console.log('Added to cart');
    this.router.navigateByUrl('/cartitems');
  }, err => {
    console.log(err);
    this.router.navigateByUrl('/unauth');
  }, () => {
    console.log('get request is sent');
  });
}
}

checkItems(product): any {
  console.log(product);
  for (let index = 0; index < this.existingItems.length; index++) {
    if (this.existingItems[index].itemProductId === product.dealersProductId) {
      return true;
    }
  }
  return false;
}
goToCart() {
  this.router.navigateByUrl('/cartitems');
}
}
