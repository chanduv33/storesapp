import { Component, OnInit } from '@angular/core';
import { UserserviceService } from '../userservice.service';
import { Router } from '@angular/router';
import { ProductsComponent } from '../products/products.component';
import { AuthenticationService } from '../authentication-service.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(public service: UserserviceService, public router: Router, private loginservice: AuthenticationService) { }
  statusCode = null;
  resp: any;
  invalidLogin = false;
  ngOnInit() {
  }

  // tslint:disable-next-line: adjacent-overload-signatures

  loginData(form) {
    console.log(form.value);
    this.service.loginRequest(form.value).subscribe(resp => {
      console.log(resp);
      this.resp = resp;
      this.statusCode = this.resp.statusCode ;
      if ( this.statusCode === 201) {
      localStorage.setItem('user', JSON.stringify(resp.user));
      this.service.selectedItems = JSON.parse(localStorage.getItem('user')).items;
      console.log('Items', this.service.selectedItems);
      localStorage.setItem('cartedItems',this.service.selectedItems);
      localStorage.setItem('authenticatedUser', form.value);
      console.log(resp.user);
      this.loginservice.authenticate(form.value.username, form.value.password).subscribe(
        data => {
          this.invalidLogin = false;
        },
        error => {
          this.invalidLogin = true;
        }
      );
      if ( resp.user.role === 'ROLE_DEALER') {
      this.router.navigateByUrl('/dealer');
    }
      if (resp.user.role === 'ROLE_CUSTOMER') {
      this.router.navigateByUrl('/customer');
    }
      if (resp.user.role === 'ROLE_MANUFACTURER') {
      this.router.navigateByUrl('/storesapp');
    }
      if ( resp.user.role === 'ROLE_ADMIN') {
        this.router.navigateByUrl('/storesapp');
    }
      console.log('logged in');
    } else if ( this.statusCode !== 201) {
      this.router.navigateByUrl('/login');
    }
  } , err => {
      console.log(err);
    }, () => {
      console.log('login request is gone');
    });
  }

}
