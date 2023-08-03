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

      if (!sessionService.loggedUser.userId) this.router.navigate([''])

    }

  get favorites(): Media[] | null | undefined {
      return this.sessionService.loggedUser.favorites;
  }

  showDetails(favorite: Media): void {

    if (favorite.mediaType == undefined) {
      this.router.navigate([`details/tv/${favorite.mediaId}`])
    } else {
      this.router.navigate([`details/${favorite.mediaType}/${favorite.mediaId}`])
    }
  }

}
