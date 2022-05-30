import * as express from "express";
import { IUserToPost } from "../../interfaces/user.interface";
declare global {
  namespace Express {
    interface Request {
      userEmail: string;
      newUser: IUserToPost;
      isAdmin: boolean;
    }
  }
}
