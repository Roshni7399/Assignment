import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from "../../services/auth/auth.service";
import { Router } from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
 
  loginform!: FormGroup;
  submitted : boolean = false;


  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.loginform = this.fb.group({
      'email': ['', Validators.required],
      'password': ['',  [Validators.required,Validators.minLength(8),Validators.maxLength(20)]],
    })
    // localStorage.clear();
  }

  get f(): { [key: string]: AbstractControl } {
    return this.loginform.controls;
  }



  ngOnInit(): void {
  }

  Alert() {
    Swal.fire("Login Successfully")
  }

  loginUser(): any { 
    this.submitted = true;

    // stop here if form is invalid
    if(this.loginform.invalid){
      Swal.fire("Invaid field details")
      return;
    }
    const data = this.loginform.value;
    this.auth.login(data).then((res) => {
      console.log("resss login ts", res);
      if (res.status == true) {
        localStorage.setItem('token', res.Token);
        Swal.fire("Login Successfull")
        this.router.navigate(["dashboard"]);
      }
      else {
        Swal.fire("Unable to login, Please Check your credentials properly")
      }
    }

    )
  }

}
