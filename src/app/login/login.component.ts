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
    this.service.loginRequest(form.value)
      .subscribe(resp => {
        console.log(resp.headers.get('token'));
        console.log(resp.headers.get('userId'));
        console.log(resp.headers.get('role'));

        if (resp.status == 200 ) {
          localStorage.setItem('token', resp.headers.get('token'));
          localStorage.setItem('role', resp.headers.get('role'));
          localStorage.setItem('userId', resp.headers.get('userId'));
          const role = resp.headers.get('role');
          console.log(resp);
          console.log(role);
          console.log(JSON.stringify(resp));
          if (role == 'ROLE_DEALER') {

            this.router.navigateByUrl('/dealer');
          }
          if (role == 'ROLE_CUSTOMER') {
            this.router.navigateByUrl('/customer');
          }
          if (role == 'ROLE_MANUFACTURER') {

            this.router.navigateByUrl('/storesapp');
          }
          if (role == 'ROLE_ADMIN') {

            this.router.navigateByUrl('/storesapp');
          }
          if (role == 'ROLE_DEALER' || role == 'ROLE_CUSTOMER') {
            this.service.getCartItems().subscribe(resp => {
              console.log(JSON.stringify(resp));
              console.log(JSON.stringify(resp.items));
              if (resp.statusCode == 201) {
                localStorage.setItem('items', JSON.stringify(resp.items));
              }
            }, err => {
              console.log(err);
            }, () => {
              console.log('failed to get cart items');
            });
          }
          this.invalidLogin = false;
          // this.loginservice.authenticate(form.value.username, form.value.password).subscribe(
          //   data => {
          //     this.invalidLogin = false;
          //   },
          //   error => {
          //     this.invalidLogin = true;
          //   }
          // );
          console.log('logged in');
          // tslint:disable-next-line:align
        } else if (resp.status !== 200) {
          this.invalidLogin = true;
          this.router.navigateByUrl('/login');
        }
      }, err => {
        console.log(err);
      }, () => {
        console.log('login request is gone');
      });
  }

}
