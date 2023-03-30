import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../models/User";
import {IMatResponse} from "../interfaces/IMatResponse";
import {Media} from "../models/Media";
//import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly usersUrl: string = 'http://44.201.170.61:443/mattmdb-1.0-SNAPSHOT/api/v2/users';
  private readonly mediaUrl: string = 'http://44.201.170.61:443/mattmdb-1.0-SNAPSHOT/api/v2/media';

  constructor(private httpClient: HttpClient) { } // Inyecto la libreria HttpClient para poder usarla

  private getHttpOptions() {
    return {
      headers: new HttpHeaders(
        {
          'content-type': 'application/json'
        })
    };
  }

  private getDeleteHttpOptions(body: User) {
    return {
      headers: new HttpHeaders(
        {
          'content-type': 'application/json'
        }),
      body: body
    };
  }

  getUsers(): Observable<User> {          // Retorna un observable de User.
      return this.httpClient.get<User>(this.usersUrl);
  }

  getUser(userId: string): Observable<User> {
    return this.httpClient.get<User>(`${this.usersUrl}/${userId}`)
  }

  registerUser(body: User): Observable<IMatResponse> {
    return this.httpClient.post<IMatResponse>(this.usersUrl, body, this.getHttpOptions());
  }

  loginUser(body: User): Observable<IMatResponse> {
    return this.httpClient.post<IMatResponse>(`${this.usersUrl}/login`, body, this.getHttpOptions());
  }

  editUser(body: User): Observable<IMatResponse> {
    return  this.httpClient.put<IMatResponse>(`${this.usersUrl}/${body.userId}`, body, this.getHttpOptions())
  }

  deleteUser(body: User): Observable<IMatResponse> {

    // solucion a enviar body en request delete:
    // https://stackoverflow.com/questions/38819336/body-of-http-delete-request-in-angular2

    return this.httpClient.delete<IMatResponse>(`${this.usersUrl}/${body.userId}`, this.getDeleteHttpOptions(body));
  }

  toggleFavorite(userId: string, body: Media): Observable<IMatResponse> {

    // console.log("FAVORITE", body)
    return this.httpClient.post<IMatResponse>(`${this.usersUrl}/favorites/${userId}`, body, this.getHttpOptions());

  }

  getFavorites(userId: string): Observable<IMatResponse> {

    console.log("FAVORITES ------- ", userId)

    return this.httpClient.get<IMatResponse>(`${this.mediaUrl}/favorites/${userId}`)

  }

}

