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

        console.log("TRENDING: ", response)
        /* console.log(response.results)*/

        this.trendingMediaArray = response.results.slice(0,5);

      })

    this.mediaService.getTopRated()
      .subscribe( response => {
        this.topRatedMediaArray = response.results.slice(0,5);

        // console.log("TOP RATED: ", response)

        console.log("TOP RATED: ", this.topRatedMediaArray)
        console.log("TRENDING: ", this.trendingMediaArray)
      })

  }

  showDetails(media: Media): void {
      console.log("Hello World")

    this.router.navigate([`details/${media.id}`])

  }

}

export interface ITMDBResponse {

  page: number;
  results: Array<Media>;
  total_pages: number;
  total_results: number;

/*  constructor(page: number, results: Array<Media>, total_pages: number, total_results: number) {
    this.page = page;
    this.results = results;
    this.total_pages = total_pages;
    this.total_results = total_results;
  }*/
}
