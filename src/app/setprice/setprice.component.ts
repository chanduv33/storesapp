import { Component, OnInit } from '@angular/core';
import { DealerserviceService } from '../dealerservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-setprice',
  templateUrl: './setprice.component.html',
  styleUrls: ['./setprice.component.css']
})
export class SetpriceComponent implements OnInit {

  constructor(public service: DealerserviceService, public router: Router) { }

  ngOnInit() {
  }

  setPrice(form) {
    console.log(form.value);
    this.service.setSellingPrice(form.value).subscribe(resp => {
      console.log(resp);
      this.router.navigateByUrl('/getdealprods');
    }, err => {
      console.log(err);
      this.router.navigateByUrl('/unauth');
    }, () => {
      console.log('set selling price request sent');
     
    });
  }

}
