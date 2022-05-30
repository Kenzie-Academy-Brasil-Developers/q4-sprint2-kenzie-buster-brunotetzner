import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import { AppError } from "../errors/appError";

export const validateTokenMiddlere = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const token = request.headers.authorization;

  if (!token) {
    throw new AppError(401, "Missing authorization header");
  }

  jwt.verify(token, "SECRET KEY", (error, decoded: any) => {
    if (error) {
      throw new AppError(401, "Invalid token");
    }
    request.userEmail = decoded.email;
    request.isAdmin = decoded.isAdmin;
  });
  return next();
};
