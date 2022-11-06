import { Component, OnInit } from '@angular/core';
import { AbstractControl, ValidatorFn, FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { AuthService } from "../../services/auth/auth.service";
import Swal from "sweetalert2";
import { Router } from "@angular/router";



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupform!: FormGroup;
  submitted: boolean = false;


  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router

  ) {
    this.signupform = this.fb.group({
      firstname: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z]+$')]),
      lastname: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z]+$')]),
      // 'mobileno': ['', [Validators.required, Validators.maxLength(10)]],
      mobileno: new FormControl('', [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]),
      email: new FormControl('', [Validators.required, Validators.email]),
      'password': ['', [Validators.required, Validators.minLength(8)]],
      'confirmpassword': ['', Validators.required],
      'add_line1': new FormControl('', [Validators.required]),
      'add_line2': [''],
      state: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z]+$')]),
      city: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z]+$')])


    },
      {
        validators: this.MustMatch('password', 'confirmpassword')
      }
    )
  }

  // used to get all the controls
  get f(): { [key: string]: AbstractControl } {
    return this.signupform.controls;
  }

  get firstname(){
    return this.signupform.get('firstname');
  }
  get email(){
    return this.signupform.get('email');
  }
  get lastname(){
    return this.signupform.get('lastname');
  }
  get add_line1(){
    return this.signupform.get('add_line1');
  }
  get state(){
    return this.signupform.get('state');
  }
  get city(){
    return this.signupform.get('city');
  }
  get mobileno(){
    return this.signupform.get('mobileno');
  }
  get password(){
    return this.signupform.get('password');
  }
  get confirmpassword(){
    return this.signupform.get('confirmpassword');
  }
 



  // Password Match
  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors['MustMatch']) {
        return
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ MustMatch: true });
      }
      else {
        matchingControl.setErrors(null);
      }
    }
  }



  ngOnInit(): void {
  }


  signup() {
    this.submitted = true;
    if (this.signupform.invalid) {
      Swal.fire("Invaid field details")
      return;
    }
    const data = this.signupform.value;
    delete data['confirmpassword']
    this.auth.signup(data).subscribe((res) => {
      console.log("ress", res);

      if (res.status === true) {
        Swal.fire("Signup Successfully");
        this.router.navigate(["login"]);
      }
      else {
        Swal.fire("Please fill your details properly !!!")
      }
    }
    )
  }

  // Reset Form
  resetForm() {
    this.submitted = false;
    this.signupform.reset();
  }



}
