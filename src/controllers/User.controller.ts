import { Request, Response } from "express";
import UserService from "../services/User.service";
import { IUserToPost } from "../interfaces/user.interface";
class UserController {
  postUsercontroller = async (request: Request, response: Response) => {
    const { status, message } = await UserService.postUserService(
      request.newUser
    );
    return response.status(status).json(message);
  };
  loginUserController = async (request: Request, response: Response) => {
    console.log("user123");
    const { status, message } = await UserService.loginUserService(
      request.body
    );

    return response.status(status).json(message);
  };
}
export default new UserController();
