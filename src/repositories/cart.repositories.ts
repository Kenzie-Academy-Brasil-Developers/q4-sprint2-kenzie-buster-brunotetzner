import { Cart } from "../entities/cart.entity";
import { AppDataSource } from "../data-source";
import { Repository } from "typeorm";
import { hash } from "bcrypt";

interface ICartRepo {
  save: (cart: Partial<Cart>) => Promise<Cart>;
  getAll: () => Promise<Cart[]>;
  retrieve: (payload: string) => Promise<Cart | null>;
  update: (uuid: string, payload: Partial<Cart>) => Promise<{} | null>;
  delete: (uuid: string) => Promise<Cart>;
}

class CartRepository implements ICartRepo {
  private repo: Repository<Cart>;

  constructor() {
    this.repo = AppDataSource.getRepository(Cart);
  }

  save = async (cart: Partial<Cart>) => {
    const createCart = await this.repo.save(cart);
    return createCart;
  };

  getAll = async () => await this.repo.find();

  retrieve = async (uuid: string) => {
    return await this.repo.findOneBy({ uuid: uuid });
  };

  update = async (uuid: string, payload: Partial<Cart>) => {
    const update = await this.repo.update(uuid, { ...payload });
    if (update) {
      return await this.repo.findOneBy({ uuid: uuid });
    }
    return {};
  };

  delete = async (uuid: string) => {
    const userToDelete = await this.retrieve(uuid);
    await this.repo.delete(uuid);
    return userToDelete;
  };
}

export default new CartRepository();
