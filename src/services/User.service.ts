import { IUserToPost, IUserLogin } from "../interfaces/user.interface";
import userRepositories from "../repositories/user.repositories";
import jwt from "jsonwebtoken";

class UserService {
  postUserService = async ({ name, email, password, isAdmin }: IUserToPost) => {
    const user = await userRepositories.save({
      name,
      email: email.toLowerCase(),
      password,
      isAdmin,
    });
    return { status: 200, message: user };
  };

  loginUserService = async ({ email, password }: IUserLogin) => {
    const user = await userRepositories.getByEmail(email);
    console.log(user);
    if (!user) {
      return { status: 400, message: "User not found" };
    }
    const token = jwt.sign({ email: email }, "SECRET KEY", {
      expiresIn: "24h",
    });
    return { status: 200, message: { token: token } };
  };
}

export default new UserService();
