import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {User} from "../../models/User";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginUser: User;
  loginForm: FormGroup;
  passwordMinLength: number = 8;

  constructor(private formBuilder: FormBuilder) {  // inyecto el formBuilder

    this.loginForm = formBuilder.group({
      email: ['', Validators.compose([
        Validators.required,
        Validators.email
      ])],
      password: ['', Validators.compose([
        Validators.required,
        Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/),
        Validators.minLength(this.passwordMinLength)
      ])]
    })

    this.loginUser = new User('', this.loginForm.value.email, this.loginForm.value.password, '')

    console.log(this.loginUser)
  }

  submit(): void {

    this.loginUser.email = this.loginForm.value.email;
    this.loginUser.password = this.loginForm.value.password;

    this.loginForm.reset();
    console.log('Submited Login User --->', this.loginUser);

  }

}
