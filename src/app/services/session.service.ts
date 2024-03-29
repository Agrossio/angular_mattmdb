import {Injectable, OnInit} from '@angular/core';
import {User} from "../models/User";
import {Media} from "../models/Media";
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  loggedUser: User = new User();

constructor(private userService: UserService) {

  this.loggedUser.userId = localStorage.getItem('userid');

  // TODO use JWT instead of userId and getUser only if loggedUser is undefined

  if (this.loggedUser.userId) {
    // With the userId get the user data to initialize the user session:
    this.userService.getUser(this.loggedUser.userId).subscribe(response => {

      this.loggedUser.email = response.data.email;
      this.loggedUser.username = response.data.username;
      this.loggedUser.favorites = response.data.favorites

    })
  }

}

  // update session data when called:
  updateSession(userId?: string | null, username?: string | null, email?: string | null, favorites?: Media[] | null) {

    this.loggedUser.userId = userId;
    this.loggedUser.username = username;
    this.loggedUser.email = email;
    this.loggedUser.favorites = favorites;

    if(!userId) {
      localStorage.clear();
    } else {
      localStorage.setItem('userid', userId);
    }

  }

  updateFavorites(favorites?: Media[] | null) {
    this.loggedUser.favorites = favorites;
  }

}
