import { AppError } from "../errors/appError";
import { IDvdToPost } from "../interfaces/Dvd.interface";
import DvdRepository from "../repositories/dvd.repositories";
import stockRepositories from "../repositories/stock.repositories";
import cartRepositories from "../repositories/cart.repositories";
import userRepositories from "../repositories/user.repositories";
import { User } from "../entities/user.entity";
import { Dvd } from "../entities/dvd.entity";
class DvdService {
  postDvdService = async ({ name, duration, quantity, price }: IDvdToPost) => {
    const stock = await stockRepositories.save({ quantity, price });
    const dvd = await DvdRepository.save({ name, duration, stock });
    return { status: 201, message: dvd };
  };

  getDvdsService = async () => {
    const dvds = await DvdRepository.getAll();

    const serializedDvds = dvds.map((dvd) => {
      return {
        duration: dvd.duration,
        name: dvd.name,
        stock: dvd.stock,
        id: dvd.uuid,
      };
    });
    return { status: 200, message: serializedDvds };
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
          Error: `Current stock: ${dvd.stock.quantity}, received demand ${quantity}`,
        },
      };
    }
    const userCarts = user.carts;
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
    const cartToSave = { total, user, dvd: dvd, paid: false };
    const newCart = await cartRepositories.save(cartToSave);

    return { status: 200, message: newCart };
  };
}

export default new DvdService();
