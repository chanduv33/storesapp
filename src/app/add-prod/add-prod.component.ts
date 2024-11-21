import { Component, OnInit } from '@angular/core';
import { User } from '../User';
import { Product } from '../Product';
import { ManufacturerserviceService } from '../manufacturerservice.service';
import { Router } from '@angular/router';
import { Observable, ReplaySubject } from 'rxjs';

@Component({
  selector: 'app-add-prod',
  templateUrl: './add-prod.component.html',
  styleUrls: ['./add-prod.component.css']
})
export class AddProdComponent implements OnInit {
  user: User;
  product: Product;
  statusCode = null;
  resp: any;
  base64Output: string;
  file: File;
  constructor(public service: ManufacturerserviceService, public router: Router) { }
  ngOnInit() {
  }


  onFileSelected(event) {
    this.file = event.target.files[0];
    this.convertFile(event.target.files[0]).subscribe(base64 => {
      this.base64Output = base64;
      console.log(base64);
    });
  }

  convertFile(file: File): Observable<string> {
    const result = new ReplaySubject<string>(1);
    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = (event: any) => result.next(btoa(event.target.result.toString()));
    return result;
  }
  addProductData(form) {
    console.log(form.value);
    this.product = form.value;
    this.user = {
      id: Number(localStorage.getItem('userId')),
      products: [form.value]
    };
    this.service.addProduct(this.user, this.file).subscribe(resp => {
      console.log('backend response', resp);
      this.resp = resp;
      this.statusCode = this.resp.status;
      if (this.resp.status === 201) {
        this.router.navigateByUrl('/addproduct');
      }
    }, err => {
      console.log(err);
    }, () => {
      console.log('addproduct request is gone');
    });
  }
}
