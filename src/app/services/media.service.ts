import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import {ITmdbResponse} from "../interfaces/ITmdbResponse";
import {Media} from "../models/Media";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class MediaService {
  private mediaDetails?: Media;

  constructor(private httpClient: HttpClient) { } // Inyecto la libreria HttpClient para poder usarla

  private getHttpOptions() {

    return {
            headers: new HttpHeaders(
        {
                'content-type': 'application/json'
                })
            };
  }

  getTrending(): Observable<ITmdbResponse> {          // Retorna un observable de ITmdbResponse.
    return this.httpClient.get<ITmdbResponse>(environment.trendingUrl);
  }

  getTopRated(): Observable<ITmdbResponse> {          // Retorna un observable de ITmdbResponse.
    return this.httpClient.get<ITmdbResponse>(environment.popularUrl);
  }

  searchMedia(searchString: string, page: number = 1): Observable<ITmdbResponse> {          // Retorna un observable de ITmdbResponse.
    return this.httpClient.get<ITmdbResponse>(`https://api.themoviedb.org/3/search/multi?api_key=${environment.apiKey}&query=${searchString}&page=${page}&include_adult=false`);
  }

  getDetails(mediaId: number, mediaType: string): Observable<Media> {
    return this.httpClient.get<Media>(`https://api.themoviedb.org/3/${mediaType}/${mediaId}?api_key=${environment.apiKey}`)
  }

  getVideo(mediaId: number, mediaType: string): Observable<ITmdbResponse> {
    return this.httpClient.get<ITmdbResponse>(`https://api.themoviedb.org/3/${mediaType}/${mediaId}/videos?api_key=${environment.apiKey}&language=en-US`)
  }

}

