import { Component, OnInit } from '@angular/core';
import { UserserviceService } from '../userservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-updatemanufacturer',
  templateUrl: './updatemanufacturer.component.html',
  styleUrls: ['./updatemanufacturer.component.css']
})
export class UpdatemanufacturerComponent implements OnInit {

  constructor(public service: UserserviceService, public router: Router) { }

  ngOnInit() {
  }

  updateManufacturer(form) {
    console.log(form.value);
    console.log(this.service.selectedUser);
    this.service.updateMan(this.service.selectedUser).subscribe(resp => {
      console.log(resp);
      this.router.navigateByUrl('/admin');
    }, err => {
      console.log(err);
      this.router.navigateByUrl('/unauth');
    }, () => {
      console.log(' request sent');
    });
  }

}
