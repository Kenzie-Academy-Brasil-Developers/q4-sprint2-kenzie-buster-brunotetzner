import "express-async-errors";
import express from "express";
import userRoutes from "./routes/user.routes";
import dvdRoutes from "./routes/Dvd.routes";
import cartRoutes from "./routes/cart.routes";
import { Request, Response, NextFunction } from "express";
import { AppError } from "./errors/appError";
const app = express();

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/dvds", dvdRoutes);
app.use("/api/cart", cartRoutes);
app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      message: err.message,
    });
  }
  console.log(err);
});
export { app };
