import {Component, OnInit} from '@angular/core';
import {Media} from "../../models/Media";
import {SessionService} from "../../services/session.service";
import {User} from "../../models/User";
import {Router} from "@angular/router";

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent {

    constructor(private sessionService: SessionService, private router: Router) {
    }

  get favorites(): Media[] | null | undefined {
       console.log("FAVORITES", this.sessionService.loggedUser.favorites)
      return this.sessionService.loggedUser.favorites;
  }

  showDetails(favorite: Media): void {

    if (favorite.mediaType == undefined) {
      console.log("Hello world")
      this.router.navigate([`details/tv/${favorite.mediaId}`])
    } else {

      this.router.navigate([`details/${favorite.mediaType}/${favorite.mediaId}`])
    }
  }

}
