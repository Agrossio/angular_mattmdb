import { Component } from '@angular/core';
import {SessionService} from "../../services/session.service";
import {User} from "../../models/User";
import {ModalsService} from "../../services/modals.service";
import {Router} from "@angular/router";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  searchString?: string;
  BASE_URL: string = environment.baseUrl

  constructor(private sessionService: SessionService, private modalsService: ModalsService, private router: Router){   // inyecto los servicios
  }

  get session(): User {
    return this.sessionService.loggedUser;
  }

  logout(): void {
    this.sessionService.updateSession()
    this.router.navigate(['/']);

  }

  search(searchString: string): void {
    this.router.navigate([`search/${searchString}`])
  }

  get showRegisterStatus(): boolean {
    return this.modalsService.showRegister;
  }

  get showLoginStatus(): boolean {
    return this.modalsService.showLogin;
  }

  toggleRegister(): void {
    this.modalsService.toggleRegister();
  }

  toggleLogin(): void {
    this.modalsService.toggleLogin();
  }

}
