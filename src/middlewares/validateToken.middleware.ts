import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
require("dotenv").config();

import { AppError } from "../errors/appError";
import { User } from "../entities/user.entity";

export const validateTokenMiddlere = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const token = request.headers.authorization;

  if (!token) {
    // throw new AppError(401, "Missing authorization header");
    return response.status(401).json({ Error: "Missing authorization header" });
  }

  jwt.verify(token, "SECRET KEY", (error, decoded: any) => {
    if (error) {
      // (token);
      // throw new AppError(401, "Invalid token");
      return response.status(401).json({ Error: "Invalid Token" });
    }
    request.userEmail = decoded.email;
    request.isAdmin = decoded.isAdmin;
  });
  return next();
};
