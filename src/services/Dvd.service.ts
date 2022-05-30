import { AppError } from "../errors/appError";
import { IDvdToPost, IDvd } from "../interfaces/Dvd.interface";
import DvdRepository from "../repositories/dvd.repositories";
import stockRepositories from "../repositories/stock.repositories";
import cartRepositories from "../repositories/cart.repositories";
import userRepositories from "../repositories/user.repositories";
import { User } from "../entities/user.entity";

class DvdService {
  postDvdService = async ({ name, duration, quantity, price }: IDvdToPost) => {
    const stock = await stockRepositories.save({ quantity, price });
    const dvd = await DvdRepository.save({ name, duration, stock });
    return { status: 201, message: dvd };
  };

  getDvdsService = async (id: string) => {
    const dvd = await DvdRepository.retrieve(id);
    return { status: 200, message: dvd };
  };

  buyDvdService = async (id: string, quantity: number, userEmail: string) => {
    const user: any = await userRepositories.getByEmail(userEmail);
    // const user = users.find((item) => item.email === userEmail);
    const dvd = await DvdRepository.retrieve(id);

    if (!dvd) {
      throw new AppError(404, "Dvd not found");
    }

    const stockId: any = dvd?.stock.uuid;
    const newStock = { quantity: dvd.stock.quantity - quantity };

    if (newStock.quantity < 0) {
      throw new AppError(
        400,
        `Current stock: ${dvd.stock.quantity}, received demand ${quantity}`
      );
    }

    const stockActualized = await stockRepositories.update(stockId, newStock);
    const total = quantity * dvd.stock.price;
    const cartToSave = { total: total, user: user, dvd: dvd };
    const cart = await cartRepositories.save(cartToSave);
    console.log("HERE");
    return { status: 200, message: cart };
  };
}

export default new DvdService();
