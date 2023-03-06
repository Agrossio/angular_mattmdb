export class User {

username: string;
email: string;
password: string;
password2: string;

/*  constructor() {
  }*/

  constructor(username: string, email: string, password: string, password2: string) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.password2 = password2;
  }

}
