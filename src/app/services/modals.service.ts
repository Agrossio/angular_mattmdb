import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalsService {
  private _showRegister: boolean = false;
  private _showLogin: boolean = false;

  constructor() { }

  get showRegister(): boolean {
    return this._showRegister;
  }

  get showLogin(): boolean {
    return this._showLogin;
  }

  toggleRegister() {
    this._showRegister = !this._showRegister;
  }

  toggleLogin() {
    this._showLogin = !this.showLogin;
  }

}
