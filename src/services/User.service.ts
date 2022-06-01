import { IUserToPost, IUserLogin } from "../interfaces/user.interface";
import userRepositories from "../repositories/user.repositories";
import jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import { hash } from "bcrypt";
class UserService {
  postUserService = async ({ name, email, password, isAdmin }: IUserToPost) => {
    password = await hash(password, 10);

    const user = await userRepositories.save({
      name,
      email: email.toLowerCase(),
      password,
      isAdmin,
    });
    return { status: 200, message: user };
  };

  loginUserService = async ({ email, password }: IUserLogin) => {
    const users = await userRepositories.getAll();

    if (users.length === 0) {
      const hashPassword = await hash(process.env.ADMIN_PASSWORD, 10);
      const userToSave = {
        name: process.env.ADMIN_NAME,
        email: process.env.ADMIN_EMAIL,
        password: hashPassword,
        isAdmin: true,
      };
      await userRepositories.save(userToSave);
    }

    const user = await userRepositories.getByEmail(email);
    if (!user) {
      return { status: 400, message: { Error: "User not found" } };
    }
    const passwordMatch = bcrypt.compareSync(password, user.password);
    if (!passwordMatch) {
      return { status: 400, message: { error: "Invalid email or password" } };
    }
    const token = jwt.sign({ email: email }, "SECRET KEY", {
      expiresIn: "24h",
    });
    return { status: 200, message: { token: token } };
  };
}

export default new UserService();
