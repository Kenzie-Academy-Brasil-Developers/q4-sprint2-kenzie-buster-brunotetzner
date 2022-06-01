import { Request, Response } from "express";
import UserService from "../services/User.service";
class UserController {
  postUsercontroller = async (request: Request, response: Response) => {
    const { status, message } = await UserService.postUserService(request.body);
    return response.status(status).json(message);
  };
  loginUserController = async (request: Request, response: Response) => {
    const { email, password } = request.body;
    if (!(email || password)) {
      return response
        .status(400)
        .json({ Error: "You need to inform email and password" });
    }
    const { status, message } = await UserService.loginUserService(
      request.body
    );

    return response.status(status).json(message);
  };
}
export default new UserController();
