import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth/auth.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
loggedinUser:any;

userId: any;
user: any = {
  firstname: '',
  lastname: '',
  address: { add_line1: '', add_line2: '',  state: '' , city: ''},
  email: '',
  mobileno: '',
};


  constructor(
    private Apiservice : AuthService,
    private router: Router,

  ) { }

  ngOnInit(): void {
    this.loggedinUser = JSON.parse(localStorage.getItem('user') as any);

  }
  

}
