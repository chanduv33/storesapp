import { Component, OnInit } from '@angular/core';
import { User } from '../User';
import { Product } from '../Product';
import { ManufacturerserviceService } from '../manufacturerservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-prod',
  templateUrl: './add-prod.component.html',
  styleUrls: ['./add-prod.component.css']
})
export class AddProdComponent implements OnInit {
  user: User;
  product: Product;
  statusCode = null;
    resp : any;
    constructor(public service: ManufacturerserviceService, public router: Router) { }
  
    ngOnInit() {
    }
    addProductData(form) {
      console.log(form.value);
      this.user = JSON.parse(localStorage.getItem('user'));
      this.user.products = [form.value];
      this.service.addProduct(this.user).subscribe(resp => {
        console.log('backend response', resp);
        this.resp = resp;
        this.statusCode = this.resp.statusCode ;
        if(this.resp.statusCode === 201) {
          this.router.navigateByUrl('/addproduct');
        }
      }, err => {
        console.log(err);
      }, () => {
        console.log('addproduct request is gone');
      });
    }

}
