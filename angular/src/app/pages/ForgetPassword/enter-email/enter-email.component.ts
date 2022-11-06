import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from "../../../services/auth/auth.service";
import { Router } from "@angular/router";
import Swal from "sweetalert2";


@Component({
  selector: 'app-enter-email',
  templateUrl: './enter-email.component.html',
  styleUrls: ['./enter-email.component.scss']
})
export class EnterEmailComponent implements OnInit {
  emailform!: FormGroup;


  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) { 
    this.emailform = this.fb.group({
      'email': ['']
    })
  }

  ngOnInit(): void {
  }

  Alert() {
    Swal.fire("Email Sent Successfully")
  }

  forgetPassword(): any { 
    
    const data = this.emailform.value;
    this.auth.forgetpassword(data).subscribe((res) => {
      console.log("resss-- enter-email ts", res);
      if (res.status == true) {
        Swal.fire("Email Sent Successfully")
      }
      else {
        Swal.fire("Unable to Sent Mail, Please Enter Your Registered Email Properly")
      }
    }

    )
  }

}
