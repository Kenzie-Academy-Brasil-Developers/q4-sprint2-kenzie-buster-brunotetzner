import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/appError";
import * as yup from "yup";
import { SchemaOf } from "yup";
import { IDvdToPost } from "../interfaces/Dvd.interface";
import userRepositories from "../repositories/user.repositories";

export const dvdCreateSchema: SchemaOf<IDvdToPost> = yup.object().shape({
  name: yup.string().required(),
  duration: yup.number().required(),
  quantity: yup.number().required(),
  price: yup.number().required(),
});

export const validateUserMiddleware =
  (schema: SchemaOf<IDvdToPost>) =>
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const data = request.body;
      const user = await userRepositories.getByEmail(request.userEmail);
      try {
        await schema.validate(data, {
          abortEarly: false,
          stripUnknown: true,
        });
        next();
      } catch (err: any) {
        // throw new AppError(400, err.errors?.join(", "));
        return response.status(400).json({ Error: err.errors?.join(", ") });
      }
    } catch (err) {
      next(err);
    }
  };
