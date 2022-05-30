import { User } from "../entities/user.entity";
import { AppDataSource } from "../data-source";
import { Repository } from "typeorm";
import { hash } from "bcrypt";

interface IUserRepo {
  save: (user: User) => Promise<User>;
  getAll: () => Promise<User[]>;
  retrieve: (payload: string) => Promise<User | {}>;
  getByEmail: (payload: string) => Promise<User | null>;
  update: (uuid: string, payload: Partial<User>) => Promise<{} | null>;
  delete: (uuid: string) => Promise<User | {}>;
}

class UserRepository implements IUserRepo {
  private repo: Repository<User>;

  constructor() {
    this.repo = AppDataSource.getRepository(User);
  }

  save = async (user: User) => await this.repo.save(user);

  getAll = async () => await this.repo.find();

  retrieve = async (uuid: string) => {
    const user = await this.repo.findOneBy({ uuid: uuid });

    if (user) {
      return user;
    }
    return {};
  };

  getByEmail = async (email: string) => {
    return await this.repo.findOneBy({ email: email });
  };

  update = async (uuid: string, payload: Partial<User>) => {
    if (payload.password) {
      payload.password = await hash(payload.password, 10);
    }

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

export default new UserRepository();
