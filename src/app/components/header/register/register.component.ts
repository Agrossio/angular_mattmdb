import { Component } from '@angular/core';
import { User } from "../../../models/User";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { passwordMatchValidator } from "../../../validators/password-match.validator";
import {UserService} from "../../../services/user.service";
import Swal from "sweetalert2";

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

  constructor(private formBuilder: FormBuilder, private userService: UserService) {   // para poder ser inyectado tiene que ser private

    this.registerForm = formBuilder.group(          // investigar para con una forma que no este deprecada
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

    console.log(this.registerUser)
  }

  register(): void {

    this.registerUser.username = this.registerForm.value.username;

    this.registerUser.email = this.registerForm.value.email;
    this.registerUser.password = this.registerForm.value.password;
    this.registerUser.password2 = this.registerForm.value.password2;

    this.userService.registerUser(this.registerUser)
      .subscribe(response => {
        if(response.ok){
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
        } else {
          Swal.fire(
            response.message,
            'Couldn\'t create user',
            'error'
          )
        }
      })



    this.registerForm.reset();
    console.log('Submited Register User ---->',this.registerUser)

  }

}
