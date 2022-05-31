import { Cart } from "../entities/cart.entity";
import { AppDataSource } from "../data-source";
import { Repository } from "typeorm";
import { hash } from "bcrypt";

interface ICartRepo {
  save: (cart: Partial<Cart>) => Promise<Cart>;
  getAll: () => Promise<Cart[]>;
  retrieve: (payload: string) => Promise<Cart | {}>;
  update: (uuid: string, payload: Partial<Cart>) => Promise<{} | null>;
  delete: (uuid: string) => Promise<Cart | {}>;
}

class CartRepository implements ICartRepo {
  private repo: Repository<Cart>;

  constructor() {
    this.repo = AppDataSource.getRepository(Cart);
  }

  save = async (cart: Partial<Cart>) => {
    return await this.repo.save(cart);
  };

  getAll = async () => await this.repo.find();

  retrieve = async (uuid: string) => {
    const user = await this.repo.findOneBy({ uuid: uuid });

    if (user) {
      return user;
    }
    return {};
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
