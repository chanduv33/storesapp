import { Component, OnInit } from '@angular/core';
import { DealerserviceService } from '../dealerservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-updatedealerproduct',
  templateUrl: './updatedealerproduct.component.html',
  styleUrls: ['./updatedealerproduct.component.css']
})
export class UpdatedealerproductComponent implements OnInit {

  constructor(public service: DealerserviceService, public router: Router) { }

  ngOnInit() {
  }
  updatedealerProduct(form) {
    console.log(form.value);
    this.service.updateDealerProduct(form.value).subscribe(resp => {
      console.log(resp);
      this.router.navigateByUrl('/getdealprods');
    }, err => {
      console.log(err);
      this.router.navigateByUrl('/unauth');
    }, () => {
      console.log('update product request sent');
    });
  }
}
