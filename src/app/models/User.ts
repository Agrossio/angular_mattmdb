export class User {
userId?: string;
username?: string;
email: string;
password: string;
password2?: string;

/*  constructor() {
  }*/

  constructor(email: string, password: string, username?: string, password2?: string, userId?: string) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.password2 = password2;
    this.userId = userId;
  }

}
