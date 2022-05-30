import { ICartToPut } from "../interfaces/Cart.interface";

class CartService {
  putCartService = async ({}: ICartToPut) => {
    return { status: 200, message: "post" };
  };
}

export default new CartService();
