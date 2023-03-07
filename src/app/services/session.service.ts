import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  /*
    Originalmente tenia pensado hacer todo el manejo de la sesion en el componente del header haciendolo padre de todos los componentes, pero genere un servicio especifico para entender como es el manejo de datos globales a usar en varios componentes
   */

  logged: boolean = false; // lo dejo por si me sirve mas adelante

  userId: string | null = localStorage.getItem('userid');
  username: string | null =  localStorage.getItem('username');
  email: string | null =  localStorage.getItem('email');
/*  constructor() { } */

  // update session when
  updateSession(userId: string, username: string, email: string) {
    this.userId = userId;
    this.email = email;
    this.username = username;
  }

}
