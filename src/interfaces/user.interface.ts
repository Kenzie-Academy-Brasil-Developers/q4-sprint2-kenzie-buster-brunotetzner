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
