import { Injectable } from '@angular/core';
import {User} from "../models/User";

@Injectable({
  providedIn: 'root'
})
export class SessionService {

 // logged: boolean = false; // lo dejo por si me sirve mas adelante
  loggedUser: User = new User(localStorage.getItem('email'), null, localStorage.getItem('username'), null, localStorage.getItem('userid'));

/*  constructor() { } */

  // update session data when called:
  updateSession(userId: string | null, username: string | null, email: string | null) {

    this.loggedUser = new User(email, null, username, null, userId)

    // this.logged = true;    // lo dejo por si me sirve mas adelante
  }

}
