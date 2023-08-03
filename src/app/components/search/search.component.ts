import {Component, OnInit} from '@angular/core';
import {Media} from "../../models/Media";
import {SessionService} from "../../services/session.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MediaService} from "../../services/media.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchedMediaArray: Array<Media> = []

  constructor(private sessionService: SessionService, private router: Router, private mediaService: MediaService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {

    this.activatedRoute.params
      .subscribe(params => {

          // get id & mediaType from url:
          let searchString: string = params['searchString'];

          if (searchString == undefined) this.router.navigate([''])

          this.mediaService.searchMedia(searchString)
            .subscribe(response => this.searchedMediaArray = response.results)

        }
      )
  }


  search(searchString: string, page: number): void {


    this.mediaService.searchMedia(searchString, page)
      .subscribe(response => {
        this.searchedMediaArray = response.results
      })

}

  showDetails(media: Media): void {

    if (media.media_type == undefined) {
      this.router.navigate([`details/tv/${media.id}`])
    } else {

      this.router.navigate([`details/${media.media_type}/${media.id}`])
    }
  }

}
