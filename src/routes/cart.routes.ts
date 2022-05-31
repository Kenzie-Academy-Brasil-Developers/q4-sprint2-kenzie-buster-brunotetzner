import { Router } from "express";
import CartController from "../controllers/Cart.controller";
import { validateTokenMiddlere } from "../middlewares/validateToken.middleware";
import {
  validateUserMiddleware,
  userCreateSchema,
} from "../middlewares/validateUser.middleware";

const cartRoutes = Router();

cartRoutes.put("/pay", validateTokenMiddlere, CartController.putCartcontroller);
export default cartRoutes;
