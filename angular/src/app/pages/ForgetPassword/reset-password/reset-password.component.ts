import { Component, OnInit } from '@angular/core';
import { AbstractControl, ValidatorFn, FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { AuthService } from "../../../services/auth/auth.service";
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  resetpassform!: FormGroup;


  userId: any;
  user: any = {
    password: '',
    password_confirmation: '',
  };

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.resetpassform = this.fb.group({
      'password': ['',  [Validators.required,Validators.minLength(8)]],
      'password_confirmation': ['',  [Validators.required,Validators.minLength(8)]],

    })
   }

   get f(): { [key: string]: AbstractControl } {
    return this.resetpassform.controls;
  }

  get password(){
    return this.resetpassform.get('password');
  }

  get password_confirmation(){
    return this.resetpassform.get('password_confirmation');
  }

  ngOnInit(): void {
    localStorage.getItem('token')
  }

  resetPassword(): any {
     // stop here if form is invalid
     if(this.resetpassform.invalid){
      Swal.fire("Invaid field details")
      return;
    }
    const data = this.resetpassform.value;
    this.auth.resetpassword( data).subscribe((res: any) => {
      console.log("ress, reset-password ts to rest the password", res);
      if (res.status) {
        localStorage.getItem('token');
        Swal.fire("Password Reset Successfully");
       

      }
    })
  }

}
