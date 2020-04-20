import { Component, OnInit } from '@angular/core';
import { UserserviceService } from '../userservice.service';
import { Resp } from './Resp';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  statusCode = null;
  resp: any;
  constructor(public service: UserserviceService) { }

  ngOnInit() {
    localStorage.clear();
    sessionStorage.clear();
  }

  registerUser(form) {
    console.log(form.value);
    this.service.registerRequest(form.value).subscribe(resp => {
      console.log('backend response', resp);
      this.resp = resp;
      
      this.statusCode = this.resp.statusCode;
     
    }, err => {
      console.log(err);
      console.log('register request is gone');
    });
  }

}
