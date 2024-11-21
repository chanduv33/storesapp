import { Component, OnInit } from '@angular/core';
import { CustomerserviceService } from '../customerservice.service';
import { Router } from '@angular/router';
import { Products } from '../Products';
import { UserserviceService } from '../userservice.service';
import { Cart } from '../Cart';
import { Product } from '../Product';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  products: Product[];
  quantity = 0;
  user: any;
  existingItems: Cart[];
  item: Cart;
  cartItem: Cart;
  constructor(public service: CustomerserviceService, public router: Router, public uservice: UserserviceService) { }

  ngOnInit() {
    this.getAllProducts();
    this.getCartItems();
  }
  getCartItems() {
    this.service.getCartItems(localStorage.getItem('userId')).subscribe(resp => {
      this.existingItems = resp.items;
      console.log(this.existingItems);
    }, err => {
      console.log(err);
      this.router.navigateByUrl('/unauth');
    }, () => {
      console.log('get request is sent');
    });
  }

  getAllProducts() {
    this.service.getAllProducts().subscribe(resp => {
      this.products = resp.dealerProds;
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

    if (this.checkItems(product)) {
      return false;
    } else {
      this.quantity = Number(window.prompt('Enter number of items'));
      if (this.quantity === 0) {
        return;
      }
      this.item = {
        itemProductId: product.id,
        quantity: this.quantity,
        userId: Number(localStorage.getItem('userId'))
      };
      console.log(this.item);

      this.uservice.addItemToCart(this.item).subscribe(resp => {
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
    if (this.existingItems == null) {
      return false;
    }
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
