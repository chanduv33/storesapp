import { Component, OnInit } from '@angular/core';
import { User } from '../User';
import { UserserviceService } from '../userservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  users: User[];
  statusCode = null;
  resp: any;
  clicked = false;
  role = 'ROLE_MANUFACTURER'
  constructor(public service: UserserviceService, public router: Router) { }

  ngOnInit() {
    this.getManufacturers();
  }

  getManufacturers() {
    this.service.getAllManufacturers().subscribe(resp => {
      this.users = resp.users;
      console.log('users : ', this.users);
    }, err => {
      console.log(err);
      this.router.navigateByUrl('/unauth');
    }, () => {
      console.log('get request is sent');
    });
  }

  updateManufacturer(user) {
    this.service.selectedUser = user;
    console.log(this.service.selectedUser);
    this.router.navigateByUrl('/updateManufacturer');
  }

  deleteManufacturer(user) {
    console.log(user);
    this.service.removeManufacturer(user).subscribe(resp => {
      console.log(resp);
      this.router.navigateByUrl('/admin');
    }, err => {
      console.log(err);
      this.router.navigateByUrl('/login');
    }, () => {
      console.log(' request sent');
    });
  }

  addManufacturer(online) {
    console.log(online.value);
    this.service.registerRequest(online.value).subscribe(resp => {
      console.log('backend response', resp);
      this.resp = resp;
      this.statusCode = this.resp.statusCode;
      this.router.navigateByUrl('/admin');
    }, err => {
      console.log(err);
      console.log('add request is gone');
    });
  }

}
