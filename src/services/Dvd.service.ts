import { AppError } from "../errors/appError";
import { IDvdToPost } from "../interfaces/Dvd.interface";
import DvdRepository from "../repositories/dvd.repositories";
import stockRepositories from "../repositories/stock.repositories";
import cartRepositories from "../repositories/cart.repositories";
import userRepositories from "../repositories/user.repositories";
import { User } from "../entities/user.entity";
import { Dvd } from "../entities/dvd.entity";
import { Cart } from "../entities/cart.entity";
class DvdService {
  postDvdService = async ({ name, duration, quantity, price }: IDvdToPost) => {
    const stock = await stockRepositories.save({ quantity, price });
    const dvd = await DvdRepository.save({ name, duration, stock });
    return { status: 201, message: dvd };
  };

  getDvdsService = async (id: string) => {
    if (id.length !== 36) {
      return { status: 400, message: { Error: "Invalid Id." } };
      // throw new AppError(400, "Invalid id");
    }
    const dvd = await DvdRepository.retrieve({ uuid: id });
    if (!dvd) {
      // throw new AppError(404, "Dvd not found");
      return { status: 404, message: { Error: "Dvd not found" } };
    }

    return { status: 200, message: dvd };
  };

  buyDvdService = async (id: string, quantity: number, userEmail: string) => {
    if (id.length !== 36) {
      return { status: 400, message: { Error: "Invalid Id." } };
      // throw new AppError(400, "Invalid id");
    }
    const user: User = await userRepositories.getByEmail(userEmail);
    const dvd: Dvd = await DvdRepository.retrieve({ uuid: id });

    if (!dvd) {
      // throw new AppError(404, "Dvd not found");
      return { status: 404, message: { Error: "Dvd not found" } };
    }

    const stockId = dvd.stock.uuid;
    const newStock = { quantity: dvd.stock.quantity - quantity };

    if (newStock.quantity < 0) {
      // throw new AppError(
      //   400,
      //   `Current stock: ${dvd.stock.quantity}, received demand ${quantity}`
      // );
      return {
        status: 400,
        message: {
          error: `Current stock: ${dvd.stock.quantity}, received demand ${quantity}`,
        },
      };
    }
    //validar se o usuário tem algum carrinho e se esse esta pago
    const carts = await cartRepositories.getAll();
    let userCarts = [];
    console.log(carts);
    if (carts.length > 0) {
      userCarts = carts.filter((cart) => cart.user.email === userEmail);
      console.log(user);
    }
    const notPaidCart = userCarts.find((cart) => cart.paid === false);
    if (notPaidCart) {
      // throw new AppError(
      //   400,
      //"User already have a cart. Pay it before buy again"
      // );
      return {
        status: 400,
        message: {
          error: "User already have a not paid cart. Pay it before buy again",
        },
      };
    }

    await stockRepositories.update(stockId, newStock);

    const total = quantity * dvd.stock.price;
    // if (notPaidCart) {
    //   const cartId = notPaidCart.uuid;
    //   const propertysToUpdate = {
    //     dvds: [dvd],
    //     paid: false,
    //     total: total,
    //   };
    //   await cartRepositories.update(cartId, propertysToUpdate);
    //   console.log("HEREEEEEEEEEEE");
    //   const updatedCart = await cartRepositories.retrieve(cartId);
    //   return { status: 200, message: updatedCart };
    // }
    const cartToSave = { total, user, dvds: [dvd], paid: false };
    const newCart = await cartRepositories.save(cartToSave);

    return { status: 200, message: newCart };
  };
}

export default new DvdService();
