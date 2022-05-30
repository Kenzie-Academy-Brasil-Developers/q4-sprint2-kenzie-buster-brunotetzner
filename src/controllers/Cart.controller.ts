import { Request, Response } from "express";
import CartService from "../services/Cart.service";
class CartController {
  putCartcontroller = async (request: Request, response: Response) => {
    const { status, message } = await CartService.putCartService(request.body);
    return response.status(status).json(message);
  };
}
export default new CartController();
