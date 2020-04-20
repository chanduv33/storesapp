import { Component, OnInit } from '@angular/core';
import { ManufacturerserviceService } from '../manufacturerservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-updateproduct',
  templateUrl: './updateproduct.component.html',
  styleUrls: ['./updateproduct.component.css']
})
export class UpdateproductComponent implements OnInit {

  constructor(public service: ManufacturerserviceService, public router: Router) { }

  ngOnInit() {
  }

  updateProduct(form) {
    console.log(form.value);
    this.service.updateProduct(form.value).subscribe(resp => {
      console.log(resp);
      this.router.navigateByUrl('/getprods');
    }, err => {
      console.log(err);
      this.router.navigateByUrl('/unauth');
    }, () => {
      console.log('update product request sent');
    });
  }

}
