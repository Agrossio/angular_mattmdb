import { Component } from '@angular/core';
import {SessionService} from "../../services/session.service";
import {User} from "../../models/User";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

// no uso estas propiedades porque las consumo del sessionService
/*  logged: boolean;
    userId?: string | null;
    username?: string | null;
    email?: string | null;*/
  constructor(private sessionService: SessionService){   // injecto el SessionService

// no inicializo estas propiedades porque las consumo del sessionService:
/*    this.userId = this.sessionService.user.userId;
    this.username = this.sessionService.user.username;
    this.email = this.sessionService.user.email;
    this.logged = this.sessionService.logged;*/
  }

  get session(): User {
    return this.sessionService.loggedUser;
  }

  logout(): void{
    this.sessionService.updateSession(null, null, null)
    localStorage.clear();
  }


}
