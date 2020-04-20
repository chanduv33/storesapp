import { Component, OnInit } from '@angular/core';
import { UserserviceService } from '../userservice.service';
import { Router } from '@angular/router';
import { Orders } from '../Orders';

@Component({
  selector: 'app-getorders',
  templateUrl: './getorders.component.html',
  styleUrls: ['./getorders.component.css']
})
export class GetordersComponent implements OnInit {
orders: Orders[];
role=null;
  constructor(public service: UserserviceService, public router: Router) { }

  ngOnInit() {
    this.getOrders();
    this.role = JSON.parse(localStorage.getItem('user')).role;
  }

  getOrders() {
    this.service.getMyOrders().subscribe(resp => {
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

  

}
