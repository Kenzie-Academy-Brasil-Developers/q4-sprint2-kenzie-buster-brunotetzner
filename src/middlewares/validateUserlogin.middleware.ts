import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/appError";
import * as yup from "yup";
import { SchemaOf } from "yup";
import { IUserToPost } from "../interfaces/user.interface";
import userRepositories from "../repositories/user.repositories";
import { IUserLogin } from "../interfaces/user.interface";

export const userCreateSchema: SchemaOf<IUserLogin> = yup.object().shape({
  password: yup.string().required(),
  email: yup.string().required(),
});

export const validateUserLoginMiddleware =
  (schema: SchemaOf<IUserToPost>) =>
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const data = request.body;
      await schema.validate(data, {
        abortEarly: false,
        stripUnknown: true,
      });
      next();
    } catch (err: any) {
      throw new AppError(400, err.errors?.join(", "));
    }
  };
