import { Router } from "express";
import DvdController from "../controllers/Dvd.controller";
import { validateTokenMiddlere } from "../middlewares/validateToken.middleware";
import { validateAdminMiddleware } from "../middlewares/validateAdmin.middleware";
const dvdRoutes = Router();
dvdRoutes.post(
  "/register",
  validateTokenMiddlere,
  validateAdminMiddleware,

  DvdController.postDvdcontroller
);
dvdRoutes.get("/:id", validateTokenMiddlere, DvdController.getDvdsController);
dvdRoutes.post(
  "/buy/:id",

  DvdController.buyDvdController
);

export default dvdRoutes;
