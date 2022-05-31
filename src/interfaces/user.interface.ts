export interface IUserToPost {
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

export interface IUserLogin {
  email: string;
  password: string;
}

export interface IUser {
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
  uuid: string;
}
