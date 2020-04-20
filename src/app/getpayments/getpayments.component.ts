import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ManufacturerserviceService } from '../manufacturerservice.service';
import { Orders } from '../Orders';
import { UserserviceService } from '../userservice.service';

@Component({
  selector: 'app-getpayments',
  templateUrl: './getpayments.component.html',
  styleUrls: ['./getpayments.component.css']
})
export class GetpaymentsComponent implements OnInit {
  status: string;
  orders: Orders[];
  constructor(public service: ManufacturerserviceService, public router: Router, public uservice: UserserviceService) { }

  ngOnInit() {
    this.getPayments();
  }

  getPayments() {
    this.service.getPaymentDetails().subscribe(resp => {
      console.log(resp.orders);
      this.orders = resp.orders;
      console.log('orders component', this.orders);
    }, err => {
      console.log(err);
      this.router.navigateByUrl('/unauth');
    }, () => {
      console.log('get request is sent');
    });
  }

  setDeliveryDate(order) {
    this.uservice.selectedProduct = order;
    this.router.navigateByUrl('/setdelivered');
  }

  changeStatus(event: any, stat, tag) {
    console.log(event);
    console.log(tag);
    console.log(stat);
    console.log(this.status);
    this.status = event.target.value;
    if (stat === this.status) {
     return true;
    } else {
      return false;
    }
  }

  makeChange(order) {
    if(this.status === null) {
      this.router.navigateByUrl('/getpayments');
    } else {
    order.status = this.status;
    order.role= 'ROLE_MANUFACTURER';
    console.log(order);
    console.log(this.status);
    this.service.changeStatusOfProd(order).subscribe(resp => {
      console.log(resp);
      this.router.navigateByUrl('/getpayments');
    }, err => {
      console.log(err);
      this.router.navigateByUrl('/unauth');
    }, () => {
      console.log('get request is sent');
    });
  }
  }

}
