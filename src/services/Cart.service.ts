import cartRepositories from "../repositories/cart.repositories";
import { AppError } from "../errors/appError";
import { ICart } from "../interfaces/Cart.interface";
import { Cart } from "../entities/cart.entity";

class CartService {
  putCartService = async (userEmail: string) => {
    const allCarts = await cartRepositories.getAll();
    const cart: Cart = allCarts.find((cart) => cart.user.email === userEmail);

    if (!cart || cart.paid === true) {
      const paidUserBuys = allCarts.filter(
        (cart) => cart.user.email === userEmail
      );
      if (paidUserBuys) {
        throw new AppError(
          404,
          `You don't have a cart to pay\n ${{
            old_buys_that_you_paid: paidUserBuys,
          }}`
        );
      }
      throw new AppError(404, "You don't have a cart to pay");
    }
    const id: string = cart.uuid;
    await cartRepositories.update(id, { paid: true });
    const editedCart: Cart = await cartRepositories.retrieve(id);
    const infoToReturn = {
      cart: {
        id: id,
        paid: editedCart.paid,
        total: editedCart.total,
        dvd: editedCart.dvds,
      },
    };
    return { status: 200, message: editedCart };
  };
}

export default new CartService();
