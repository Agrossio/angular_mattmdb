import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../models/User";
import {IMatResponse} from "../interfaces/IMatResponse";
import {Media} from "../models/Media";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly USERS_URL: string = `${environment.baseUrl}/users`;
  private readonly MEDIA_URL: string = `${environment.baseUrl}/media`;
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
      return this.httpClient.get<User>(this.USERS_URL);
  }

  getUser(userId: string): Observable<IMatResponse> {
    return this.httpClient.get<IMatResponse>(`${this.USERS_URL}/${userId}`)
  }

  registerUser(body: User): Observable<IMatResponse> {
    return this.httpClient.post<IMatResponse>(this.USERS_URL, body, this.getHttpOptions());
  }

  loginUser(body: User): Observable<IMatResponse> {
    return this.httpClient.post<IMatResponse>(`${this.USERS_URL}/login`, body, this.getHttpOptions());
  }

  editUser(body: User): Observable<IMatResponse> {
    return  this.httpClient.put<IMatResponse>(`${this.USERS_URL}/${body.userId}`, body, this.getHttpOptions())
  }

  deleteUser(body: User): Observable<IMatResponse> {

    // solucion a enviar body en request delete:
    // https://stackoverflow.com/questions/38819336/body-of-http-delete-request-in-angular2

    return this.httpClient.delete<IMatResponse>(`${this.USERS_URL}/${body.userId}`, this.getDeleteHttpOptions(body));
  }

  toggleFavorite(userId: string, body: Media): Observable<IMatResponse> {
    return this.httpClient.post<IMatResponse>(`${this.USERS_URL}/favorites/${userId}`, body, this.getHttpOptions());

  }

  getFavorites(userId: string): Observable<IMatResponse> {
    return this.httpClient.get<IMatResponse>(`${this.MEDIA_URL}/favorites/${userId}`)
  }

}

