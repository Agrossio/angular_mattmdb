import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../models/User";
import {IMatResponse} from "../interfaces/IMatResponse";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly usersUrl: string = 'http://localhost:8080/mattmdb-1.0-SNAPSHOT/api/v1/users';
  private readonly loginUserUrl: string = 'http://localhost:8080/mattmdb-1.0-SNAPSHOT/api/v1/users/login';

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
      return this.httpClient.get<User>(this.usersUrl);
  }

  registerUser(body: User): Observable<IMatResponse> {
    return this.httpClient.post<IMatResponse>(this.usersUrl, body, this.getHttpOptions());
  }

  loginUser(body: User): Observable<IMatResponse> {
    return this.httpClient.post<IMatResponse>(this.loginUserUrl, body, this.getHttpOptions());
  }

  editUser(body: User): Observable<IMatResponse> {
    return  this.httpClient.put<IMatResponse>(`${this.usersUrl}/${body.userId}`, body, this.getHttpOptions())
  }

  deleteUser(body: User): Observable<IMatResponse> {

    console.log("ID A BORRAR", body.userId)

    // FALTA PASAR PASSWORD POR EL BODY Y HACER LA VERIFICACION EN EL BACK DE QUE SEA CORRECTO (ver si se para el password en los headers)

    return this.httpClient.delete<IMatResponse>(`${this.usersUrl}/${body.userId}`);
  }

}

