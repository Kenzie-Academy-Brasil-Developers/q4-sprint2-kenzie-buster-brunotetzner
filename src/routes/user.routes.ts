import { Router } from "express";
import UserController from "../controllers/User.controller";
import { validateTokenMiddlere } from "../middlewares/validateToken.middleware";
import { validateUserLoginMiddleware } from "../middlewares/validateUserlogin.middleware";
import {
  validateUserMiddleware,
  userCreateSchema,
} from "../middlewares/validateUser.middleware";

const userRoutes = Router();

userRoutes.post(
  "",
  validateTokenMiddlere,
  validateUserMiddleware(userCreateSchema),
  UserController.postUsercontroller
);
userRoutes.post(
  "/login",
  // validateUserLoginMiddleware,
  UserController.loginUserController
);
export default userRoutes;
