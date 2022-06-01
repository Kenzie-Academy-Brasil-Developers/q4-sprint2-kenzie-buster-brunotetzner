import { Router } from "express";
import DvdController from "../controllers/Dvd.controller";
import { validateTokenMiddlere } from "../middlewares/validateToken.middleware";
import { validateAdminMiddleware } from "../middlewares/validateAdmin.middleware";
import {
  dvdCreateSchema,
  validateUserMiddleware,
} from "../middlewares/validateDvd.middleware";
const dvdRoutes = Router();

dvdRoutes.post(
  "/register",
  validateTokenMiddlere,
  validateUserMiddleware(dvdCreateSchema),
  validateAdminMiddleware,

  DvdController.postDvdcontroller
);

dvdRoutes.get("/:id", validateTokenMiddlere, DvdController.getDvdsController);

dvdRoutes.post(
  "/buy/:id",
  validateTokenMiddlere,
  DvdController.buyDvdController
);

export default dvdRoutes;
