import { Component } from '@angular/core';
import { User } from "../../../models/User";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { passwordMatchValidator } from "../../../validators/password-match.validator";
import {UserService} from "../../../services/user.service";
import Swal from "sweetalert2";
import {ModalsService} from "../../../services/modals.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registerUser: User;
  registerForm: FormGroup;
  userMinLength: number = 4;
  passwordMinLength: number = 8;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private modalsService: ModalsService) {   // para poder ser inyectado tiene que ser private

    this.registerForm = formBuilder.group(          // TODO investigar una forma que no este deprecada
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
                ])],
                password2: ['', Validators.compose([
                  Validators.required,
                ])]
            },
      {
                validators: passwordMatchValidator
              }


    )

    // Initialize an empty user (form is empty) to surpass ts error:
    this.registerUser = new User(this.registerForm.value.email, this.registerForm.value.password, this.registerForm.value.username, this.registerForm.value.password2)

  }

  toggleRegister(): void {
    this.modalsService.toggleRegister();
  }

  register(): void {

    this.registerUser.username = this.registerForm.value.username;
    this.registerUser.email = this.registerForm.value.email;
    this.registerUser.password = this.registerForm.value.password;
    this.registerUser.password2 = this.registerForm.value.password2;

    this.userService.registerUser(this.registerUser)
      .subscribe(response => {
          if(response.success){
            Swal.fire(
              {
              position: 'center',
              icon: 'success',
              title: response.message,
              html: '<img src="../../../../assets/created-dog.PNG" width="40%" alt="response.message">',
  /*            showConfirmButton: false,*/
              timer: 1500
              }
            )
            this.toggleRegister();
            this.modalsService.toggleLogin();

          } else {
            Swal.fire(
              response.message,
              'Couldn\'t create user',
              'error'
            )
          }
        },

        (error: HttpErrorResponse) => {

          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.error.message,
            /*            footer: '<a href="">Why do I have this issue?</a>'*/
          })

          if(error instanceof Error) {
            console.log(error)
          }
        }
      )

    this.registerForm.reset();

  }

}
