import { Dvd } from "../entities/dvd.entity";
import { AppDataSource } from "../data-source";
import { Repository } from "typeorm";
import { hash } from "bcrypt";

interface IDvdRepo {
  save: (Dvd: Dvd) => Promise<Dvd>;
  getAll: () => Promise<Dvd[]>;
  retrieve: (payload: string) => Promise<Dvd | {}>;
  update: (uuid: string, payload: Partial<Dvd>) => Promise<{} | null>;
  delete: (uuid: string) => Promise<Dvd | {}>;
}

class DvdRepository implements IDvdRepo {
  private repo: Repository<Dvd>;

  constructor() {
    this.repo = AppDataSource.getRepository(Dvd);
  }

  save = async (Dvd: Dvd) => await this.repo.save(Dvd);

  getAll = async () => await this.repo.find();

  retrieve = async (uuid: string) => {
    return await this.repo.findOneBy({ uuid: uuid });
  };

  update = async (uuid: string, payload: Partial<Dvd>) => {
    const update = await this.repo.update(uuid, { ...payload });
    if (update) {
      return await this.repo.findOneBy({ uuid: uuid });
    }
    return {};
  };

  delete = async (uuid: string) => {
    const DvdToDelete = await this.retrieve(uuid);
    await this.repo.delete(uuid);
    return DvdToDelete;
  };
}

export default new DvdRepository();
