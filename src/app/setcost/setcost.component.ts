import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ManufacturerserviceService } from '../manufacturerservice.service';

@Component({
  selector: 'app-setcost',
  templateUrl: './setcost.component.html',
  styleUrls: ['./setcost.component.css']
})
export class SetcostComponent implements OnInit {

  constructor(public service: ManufacturerserviceService, public router: Router) { }

  ngOnInit() {
  }

  setCost(form) {
    console.log(form.value);
    this.service.setCostPrice(form.value).subscribe(resp => {
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
