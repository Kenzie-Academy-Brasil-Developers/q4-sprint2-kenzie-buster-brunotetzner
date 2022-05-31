import cartRepositories from "../repositories/cart.repositories";
import { AppError } from "../errors/appError";
import { ICart } from "../interfaces/Cart.interface";

class CartService {
  putCartService = async (userEmail: string) => {
    const allCarts = await cartRepositories.getAll();
    const cart = allCarts.find((cart) => cart.user.email === userEmail);

    if (!cart || cart.paid === true) {
      const paidUserBuys = allCarts.filter(
        (cart) => cart.user.email === userEmail
      );
      console.log(paidUserBuys);
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
    const id: any = cart.uuid;
    await cartRepositories.update(id, { paid: true });
    const editedCart: any = await cartRepositories.retrieve(id);
    const infoToReturn = {
      cart: {
        id: id,
        paid: editedCart.paid,
        total: editedCart.total,
        dvd: editedCart.dvd,
      },
    };
    return { status: 200, message: editedCart };
  };
}

export default new CartService();
