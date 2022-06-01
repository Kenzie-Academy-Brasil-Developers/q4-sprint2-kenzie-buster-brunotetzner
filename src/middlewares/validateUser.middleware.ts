import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/appError";
import * as yup from "yup";
import { SchemaOf } from "yup";
import { IUserToPost } from "../interfaces/user.interface";
import userRepositories from "../repositories/user.repositories";
import jwt from "jsonwebtoken";

export const userCreateSchema: SchemaOf<IUserToPost> = yup.object().shape({
  name: yup.string().required(),
  password: yup.string().required(),
  email: yup.string().required(),
  isAdmin: yup.boolean().required(),
});

export const validateUserMiddleware =
  (schema: SchemaOf<IUserToPost>) =>
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const token = request.headers.authorization;
      const data = request.body;
      if (!data.isAdmin) {
        data.isAdmin = false;
      }

      const emailAlreadyExists = await userRepositories.getByEmail(
        data.email.toLowerCase()
      );

      if (emailAlreadyExists) {
        // throw new AppError(409, "Email already exists");
        return response.status(409).json({ Error: "Emai already exists" });
      }

      const user = await userRepositories.getByEmail(request.userEmail);
      if (user?.isAdmin === false && request.body.isAdmin === true) {
        // throw new AppError(401, "missing admin permision");
        return response.status(401).json({ Error: "missing admin permision" });
      }
      try {
        const validatedData = await schema.validate(data, {
          abortEarly: false,
          stripUnknown: true,
        });
        request.newUser = validatedData;
        next();
      } catch (err: any) {
        // throw new AppError(400, err.errors?.join(", "));
        return response.status(400).json({ Error: err.errors?.join(", ") });
      }
    } catch (err) {
      next(err);
    }
  };
