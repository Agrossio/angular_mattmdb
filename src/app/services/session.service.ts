import { Injectable } from '@angular/core';
import {User} from "../models/User";

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  loggedUser: User = new User(localStorage.getItem('email'), null, localStorage.getItem('username'), null, localStorage.getItem('userid'));

  // update session data when called:
  updateSession(userId: string | null, username: string | null, email: string | null) {

    this.loggedUser.userId = userId;
    this.loggedUser.username = username;
    this.loggedUser.email = email;

    if(userId === null || username === null || email === null) {
      localStorage.clear();
    } else {
      localStorage.setItem('userid', userId);
      localStorage.setItem('username', username);
      localStorage.setItem('email', email);
    }





  }

}
