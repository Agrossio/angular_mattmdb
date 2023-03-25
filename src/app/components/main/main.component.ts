import {Component, OnInit} from '@angular/core';
import {Media} from "../../models/Media";
import {MediaService} from "../../services/media.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit{

trendingMediaArray: Array<Media> = [];
topRatedMediaArray: Array<Media> = [];

  constructor(private mediaService: MediaService, private router: Router) { // Inyecto el servicio MediaService para poder usarlo

  }

  // Implemento el ngOnInit para dejar el constructor mas limpio:
 ngOnInit(): void {
    this.mediaService.getTrending()
      .subscribe( response => {

        console.log("TRENDING RESPONSE: ", response)

        this.trendingMediaArray = response.results.slice(0,5);
        console.log("TRENDING: ", this.trendingMediaArray)
      })

    this.mediaService.getTopRated()
      .subscribe( response => {
        this.topRatedMediaArray = response.results.slice(0,5);

         console.log("TOP RATED RESPONSE: ", response)

        console.log("TOP RATED: ", this.topRatedMediaArray)

      })

  }

  showDetails(media: Media): void {
      console.log("MEDIA---------", media)
      console.log("MEDIA TYPE ----", media.media_type)

    if (media.media_type == undefined) {
      console.log("Hello world")
      this.router.navigate([`details/tv/${media.id}`])
    } else {

      this.router.navigate([`details/${media.media_type}/${media.id}`])
    }


  }

}

