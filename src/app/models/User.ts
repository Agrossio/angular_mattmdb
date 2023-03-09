export class User {
userId?: string | null;
username?: string | null;
email?: string | null;
password?: string | null;
password2?: string | null;

/*  constructor() {
  }*/

  constructor(email?: string | null, password?: string | null, username?: string | null, password2?: string | null, userId?: string | null) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.password2 = password2;
    this.userId = userId;
  }

}
