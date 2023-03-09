import { Component } from '@angular/core';
import {User} from "../../models/User";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {passwordMatchValidator} from "../../validators/password-match.validator";
import Swal from "sweetalert2";
import {SessionService} from "../../services/session.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  profileUser: User;
  profileForm: FormGroup;
  userMinLength: number = 4;
  passwordMinLength: number = 8;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private sessionService: SessionService) {   // para poder ser inyectado tiene que ser private

    this.profileForm = formBuilder.group(          // investigar para con una forma que no este deprecada
      {
        username: ['', Validators.compose([
          Validators.required,
          Validators.minLength(this.userMinLength)
        ])],
        email: ['', Validators.compose([
          Validators.required,
          Validators.email
        ])],
        password: ['', Validators.compose([
          Validators.required,
          Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/),
          Validators.minLength(this.passwordMinLength)
        ])]
      }
    )

    // Initialize a user with Session User to surpass ts error:
    this.profileUser = new User(this.sessionService.loggedUser.email, null, this.sessionService.loggedUser.username, null, this.sessionService.loggedUser.userId)

    // set input values from session:
    this.profileForm.controls['username'].setValue(this.profileUser.username);
    this.profileForm.controls['email'].setValue(this.profileUser.email);

    // disable inputs:
    this.profileForm.controls['username'].disable();
    this.profileForm.controls['email'].disable();
    this.profileForm.controls['password'].disable();

    console.log(this.profileUser)
  }

  editInputs(): void {

    if(this.profileForm.controls['username'].disabled){
      this.profileForm.controls['username'].enable();

      this.profileForm.controls['password'].enable();
    } else {
      this.profileForm.controls['username'].disable();
      this.profileForm.controls['email'].disable();
      this.profileForm.controls['password'].disable();
    }

  }

  save(): void {

    this.profileUser.username = this.profileForm.value.username;
    this.profileUser.password = this.profileForm.value.password;

    this.userService.editUser(this.profileUser)
      .subscribe(response => {
        if(response.ok){
          this.profileForm.controls['password'].setValue("")
          this.profileForm.controls['password'].markAsPristine()
          Swal.fire(
            {
              position: 'center',
              icon: 'success',
              title: response.message,
              html: '<img src="../../../assets/success-dog.PNG" width="40%" alt="response.message">',
              /*            showConfirmButton: false,*/
              timer: 1500
            }
          )
        } else {
          Swal.fire(
            response.message,
            'Couldn\'t edit user',
            'error'
          )
        }

        // update the session info for all the app:
        this.sessionService.updateSession(response.response.userId!, response.response.username!, response.response.email!);

        this.profileForm.controls['username'].disable();
        this.profileForm.controls['email'].disable();
        this.profileForm.controls['password'].disable();
        },
        (error: HttpErrorResponse) => {

          console.log("LOGIN", error)

          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.error.message,
            /*            footer: '<a href="">Why do I have this issue?</a>'*/
          })
        }
      )

    console.log('Submited Update User ---->',this.profileUser)

  }

}
