import { Component } from '@angular/core';
import {SessionService} from "../../services/session.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
    userId: string | null;
    username: string | null;
    email: string | null;
  constructor(private sessionService: SessionService){   // injecto el SessionService
    this.userId = this.sessionService.userId;
    this.username = this.sessionService.username;
    this.email = this.sessionService.email
  }

  logout(): void{
    localStorage.clear();
  }


}
