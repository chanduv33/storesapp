import { Component, OnInit, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { UserserviceService } from '../userservice.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit , DoCheck {

  role = null;

  constructor(public router: Router, public service: UserserviceService) { }

  ngOnInit() {
  }

  ngDoCheck() {
    if (localStorage.getItem('user')) {
      this.role = JSON.parse(localStorage.getItem('user')).role;
      console.log(this.role);
    } else {
      this.role = null;
    }
  }

  home() {
    if (this.role === 'ROLE_DEALER') {
      this.router.navigateByUrl('/dealer');
    }
    if (this.role === 'ROLE_MANUFACTURER') {
      this.router.navigateByUrl('/storesapp');
    }
    if (this.role === 'ROLE_CUSTOMER') {
      this.router.navigateByUrl('/customer');
    }
    if (this.role === 'ROLE_ADMIN') {
      this.router.navigateByUrl('/storesapp');
    }
    if ( this.role === null ) {
      this.router.navigateByUrl('/storesapp');
    }
  }

  logout() {
    localStorage.clear();
    sessionStorage.clear();
    this.role = null;
    this.service.logoutRequest().subscribe(resp => {
      console.log(resp);
    }, err => {
      console.log(err);
    }, () => {
      console.log('logout request is sent');
    });
    this.router.navigateByUrl('/login');
  }

}
