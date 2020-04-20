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
  item: Cart;
  existingItems: Cart[];
  itemsToDisplay: any[];
  constructor( public dservice: DealerserviceService, public router: Router, public service: UserserviceService ) { }

  ngOnInit() {
    this.existingItems = JSON.parse(localStorage.getItem('user')).items;
    console.log(this.existingItems);
    this.getAllProducts();
    
  }
  addToCart(product) {
    this.user = JSON.parse(localStorage.getItem('user'));
    if (this.checkItems(product)) {
      return false;
    } else {
    this.quantity = Number(window.prompt('Enter number of items'));
    console.log(this.quantity);
    if (this.quantity === 0) {
      return;
    }
    this.user.items = [
      {
        itemProductId : product.productId,
        quantity: this.quantity
      }
    ];
    this.service.addItemToCart(this.user).subscribe(resp => {
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
  getAllProducts() {
      this.dservice.getAllMansProducts().subscribe(resp => {
        console.log(resp.products);
        this.products = resp.products;
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
    this.dservice.selectedProduct = product;
    this.router.navigateByUrl('placeorder');
  }

  checkItems(product): any {
    console.log(product);
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
