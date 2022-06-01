import cartRepositories from "../repositories/cart.repositories";
import { AppError } from "../errors/appError";
import { ICart } from "../interfaces/Cart.interface";
import { Cart } from "../entities/cart.entity";
import { User } from "../entities/user.entity";
import userRepositories from "../repositories/user.repositories";

class CartService {
  putCartService = async (userEmail: string) => {
    const user = await userRepositories.getByEmail(userEmail);
    const notPaidCart = user.carts.find((cart) => cart.paid === false);
    if (!notPaidCart) {
      // throw new AppError(404, "You don't have a cart to pay");
      return {
        status: 404,
        message: { Error: "You don't have a cart to pay" },
      };
    }

    const id: string = notPaidCart.uuid;
    await cartRepositories.update(id, { paid: true });
    const editedCart: Cart = await cartRepositories.retrieve(id);

    return { status: 200, message: editedCart };
  };
}

export default new CartService();
