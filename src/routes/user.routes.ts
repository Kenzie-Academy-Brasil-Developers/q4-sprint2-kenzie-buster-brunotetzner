import { Router } from "express";
import UserController from "../controllers/User.controller";
import { validateTokenMiddlere } from "../middlewares/validateToken.middleware";
import {
  validateUserMiddleware,
  userCreateSchema,
} from "../middlewares/validateUser.middleware";

const userRoutes = Router();

userRoutes.post(
  "",
  // validateTokenMiddlere,
  validateUserMiddleware(userCreateSchema),
  UserController.postUsercontroller
);
userRoutes.post("/login", UserController.loginUserController);
export default userRoutes;
