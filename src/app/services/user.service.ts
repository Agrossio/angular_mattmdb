import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../models/User";
import {IMatResponse} from "../interfaces/IMatResponse";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly getUsersUrl: string = 'http://localhost:8080/mattmdb-1.0-SNAPSHOT/api/v1/users';
  private readonly registerUserUrl: string = 'http://localhost:8080/mattmdb-1.0-SNAPSHOT/api/v1/users';

  constructor(private httpClient: HttpClient) { } // Inyecto la libreria HttpClient para poder usarla


  private getHttpOptions() {

    return {
      headers: new HttpHeaders(
        {
          'content-type': 'application/json'
        })
    };
  }

  getUsers(): Observable<User> {          // Recibe un observable de User.

      return this.httpClient.get<User>(this.getUsersUrl);

  }

  registerUser(body: User): Observable<IMatResponse> {

    return this.httpClient.post<IMatResponse>(this.registerUserUrl, body, this.getHttpOptions())
}

}

