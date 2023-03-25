import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {User} from "../../../models/User";
import {UserService} from "../../../services/user.service";
import Swal from "sweetalert2";
import {HttpErrorResponse} from "@angular/common/http";
import {SessionService} from "../../../services/session.service";
import {Router} from "@angular/router";
import {ModalsService} from "../../../services/modals.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginUser: User = new User();
  loginForm: FormGroup;
  passwordMinLength: number = 8;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private sessionService: SessionService,private modalsService: ModalsService, private router: Router) {  // inyecto el FormBuilder y los servicios

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

    console.log(this.loginUser)
  }

  toggleLogin(): void {
    this.modalsService.toggleLogin();
  }

  login(): void {

    this.loginUser.email = this.loginForm.value.email;
    this.loginUser.password = this.loginForm.value.password;

    this.userService.loginUser(this.loginUser)
      .subscribe(response => {

        if(response.success){
          Swal.fire(
            {
              position: 'center',
              icon: 'success',
              title: response.message,
              html: '<img src="../../../../assets/success-dog.PNG" width="40%" alt="response.message">',
              /*            showConfirmButton: false,*/
              timer: 1500
            }
          )

          // update the session info for all the app:
          this.sessionService.updateSession(response.data.userId!, response.data.username!, response.data.email!, response.data.favorites);

          this.toggleLogin()
          this.router.navigate(['/profile']);

        } else {
          Swal.fire(
            response.message,
            'Couldn\'t login user',
            'error'
          )
        }

        console.log("LOGIN EVENT ----------", response.data)

      },

        (error: HttpErrorResponse) => {

          console.log("LOGIN", error)

          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.error.message,
/*            footer: '<a href="">Why do I have this issue?</a>'*/
          })

                if(error instanceof Error) {
                  console.log(error)
                }
        })

    this.loginForm.reset();
    console.log('Submited Login User --->', this.loginUser);

  }

}
