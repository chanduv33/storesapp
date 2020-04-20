import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserserviceService } from '../userservice.service';
import { Cart } from '../Cart';
import { DealerserviceService } from '../dealerservice.service';
import { CustomerserviceService } from '../customerservice.service';

@Component({
  selector: 'app-addtocart',
  templateUrl: './addtocart.component.html',
  styleUrls: ['./addtocart.component.css']
})
export class AddtocartComponent implements OnInit {
  role: any;
  items: Cart[];
  count : number;
  quantity= null;
  constructor(public service: UserserviceService, public router: Router,public cservice: CustomerserviceService ,public dservice: DealerserviceService) { }

  ngOnInit() {
    this.role = JSON.parse(localStorage.getItem('user')).role;
    this.getItems();
  }

  getItems() {
    this.service.getCartItems().subscribe(resp => {
      console.log(resp);
      console.log(this.role);
      this.items = resp.items;
      this.service.selectedItems = this.items;
      console.log( this.service.selectedItems);
      console.log(this.items.length);
      this.count = this.items.length;
      console.log('items component', this.items);
    }, err => {
      console.log(err);
      this.router.navigateByUrl('/unauth');
    }, () => {
      console.log('get request is sent');
    });
  }
  buyProduct(product,item) {
    if (this.role === 'ROLE_CUSTOMER') {
      this.quantity=item.quantity;
      this.cservice.selectedProduct = product;
      this.cservice.selectedProduct.quantity = this.quantity
      console.log(this.cservice.selectedProduct);
      this.router.navigateByUrl('/pay');
    } else if (this.role === 'ROLE_DEALER') {
      this.quantity=item.quantity;
      this.service.selectedProduct = product;
      this.service.selectedProduct.quantity = this.quantity
      product.quantity = this.quantity
      this.dservice.costProd = product;
      this.router.navigateByUrl('/pay');
    }
  }

  removeItem(item) {
    console.log(item);
    this.service.removeCartItem(item).subscribe(resp => {
      console.log(resp);
      this.router.navigateByUrl('/cartitems');
    }, err => {
      console.log(err);
      this.router.navigateByUrl('/login');
    }, () => {
      console.log(' request sent');
    });
  }
}
