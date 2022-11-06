import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth/auth.service";
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

//  Modal Popup
declare var window: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  // Modal Popup
  formModal: any;
  // Prepopulate
  loggedinUser: any;

  userId: any;
  user: any = {
    firstname: '',
    lastname: '',
    address: { add_line1: '', add_line2: '', state: '', city: '' },
    email: '',
    mobileno: '',
  };


  constructor(
    private Apiservice: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {

    // For modal Popup
    this.formModal = new window.bootstrap.Modal(
      document.getElementById("exampleModal")
    )

    // For PrePopulate
    this.loggedinUser = JSON.parse(localStorage.getItem('user') as any);

  }

  // To open a Modal with prepopulated data
  openModal() {
    this.formModal.show();
    this.user = JSON.parse(localStorage.getItem('user') as any);
    this.userId = this.user._id;
  }

  // To close a Modal
  closeModal() {
    this.formModal.hide();
  }

  // update Profile
  updateUser(data: any) {
    this.Apiservice.update(this.userId, data).subscribe((res: any) => {
      console.log("ress, profile ts for update", res);

      if (res.status) {
        Swal.fire("Update Successfully")
        localStorage.setItem('user', JSON.stringify(res.result))
        // console.log("result",res.result);
        this.closeModal();
        this.ngOnInit();


      }
    })
  }






}
