import { Component, OnInit } from '@angular/core';
import { Product } from '../Product';
import { Router } from '@angular/router';
import { DealerserviceService } from '../dealerservice.service';
import { UserserviceService } from '../userservice.service';
import { Cart } from '../Cart';

@Component({
  selector: 'app-dealer',
  templateUrl: './dealer.component.html',
  styleUrls: ['./dealer.component.css']
})
export class DealerComponent implements OnInit {
  products: Product[];
  quantity = 0;
  user: any;
  item: any;
  existingItems: Cart[];
  itemsToDisplay: any[];
  constructor(public dservice: DealerserviceService, public router: Router, public service: UserserviceService) { }

  ngOnInit() {
    this.existingItems = JSON.parse(localStorage.getItem('items'));
    console.log(this.existingItems);
    this.getAllProducts();
    this.getCartItems();

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
        userId: localStorage.getItem('userId')
      };

      this.service.addItemToCart(this.item).subscribe(resp => {
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
  getAllProducts() {
    this.dservice.getAllMansProducts().subscribe(resp => {
      this.products = resp.products;
      console.log('product component', this.products);
    }, err => {
      console.log(err);
      this.router.navigateByUrl('/unauth');
    }, () => {
      console.log('get request is sent');
    });
  }

  getCartItems() {
    this.service.getCartItems().subscribe(resp => {
      console.log(resp);
      this.existingItems = resp.items;
      console.log(this.existingItems);
    }, err => {
      console.log(err);
      this.router.navigateByUrl('/unauth');
    }, () => {
      console.log('get request is sent');
    });
  }


  buyProduct(product) {
    this.dservice.selectedProduct = product;
    this.router.navigateByUrl('placeorder');
  }

  checkItems(product): any {
    for (let index = 0; index < this.existingItems.length; index++) {
      if (this.existingItems[index].itemProductId === product.productId) {
        return true;
      }
    }
    return false;
  }

  goToCart() {
    this.router.navigateByUrl('/cartitems');
  }
}
