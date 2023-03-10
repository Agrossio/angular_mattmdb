import { Component } from '@angular/core';
import {SessionService} from "../../services/session.service";
import {User} from "../../models/User";
import {ModalsService} from "../../services/modals.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private sessionService: SessionService, private modalsService: ModalsService){   // injecto los servicios
  }

  get session(): User {
    return this.sessionService.loggedUser;
  }

  logout(): void{
    this.sessionService.updateSession(null, null, null)

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
