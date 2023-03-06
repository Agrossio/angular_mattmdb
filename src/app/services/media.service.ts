import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import {ITMDBResponse} from "../components/main/main.component";

@Injectable({
  providedIn: 'root'
})
export class MediaService {
  private readonly trendingUrl: string = 'https://api.themoviedb.org/3/trending/all/day?api_key=e65c4db5bae2b9b0565c97b1e317145e&page=1';

  private readonly topRatedUrl: string = 'https://api.themoviedb.org/3/discover/tv?api_key=e65c4db5bae2b9b0565c97b1e317145e&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=true&page=1';

  constructor(private httpClient: HttpClient) { } // Inyecto la libreria HttpClient para poder usarla

  private getHttpOptions() {

    return {
            headers: new HttpHeaders(
        {
                'content-type': 'application/json'
                })
            };
  }

  getTrending(): Observable<ITMDBResponse> {          // Recibe un observable de ITrendingResponse.

    return this.httpClient.get<ITMDBResponse>(this.trendingUrl);

  }

  getTopRated(): Observable<ITMDBResponse> {          // Recibe un observable de ITrendingResponse.

    return this.httpClient.get<ITMDBResponse>(this.topRatedUrl);

  }

}

