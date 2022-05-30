import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/appError";
import userRepositories from "../repositories/user.repositories";
export const validateAdminMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const user = await userRepositories.getByEmail(request.userEmail);
  if (user?.isAdmin === false) {
    throw new AppError(401, "missing admin permision");
  }

  next();
};
