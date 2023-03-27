import { Component } from '@angular/core';
import {SessionService} from "../../services/session.service";
import {User} from "../../models/User";
import {ModalsService} from "../../services/modals.service";
import {Router} from "@angular/router";
import {Media} from "../../models/Media";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  searchString?: string;

  constructor(private sessionService: SessionService, private modalsService: ModalsService, private router: Router){   // injecto los servicios
  }

  get session(): User {
    return this.sessionService.loggedUser;
  }

  logout(): void {
    this.sessionService.updateSession()
    this.router.navigate(['/']);

  }

  search(searchString: string): void {

    console.log("SEARCH STRING: ", searchString)

    this.router.navigate([`search/${searchString}`])

  }

  get showRegisterStatus(): boolean {
    // console.log("Show STATUS", this.modalsService.showRegister)
    return this.modalsService.showRegister;
  }

  get showLoginStatus(): boolean {
    // console.log("Show STATUS", this.modalsService.showLogin)
    return this.modalsService.showLogin;
  }

  toggleRegister(): void {
    this.modalsService.toggleRegister();
  }

  toggleLogin(): void {
    this.modalsService.toggleLogin();
  }

}
