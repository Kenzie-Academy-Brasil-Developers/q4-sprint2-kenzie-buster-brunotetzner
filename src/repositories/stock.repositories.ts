import { Stock } from "../entities/stock.entity";
import { AppDataSource } from "../data-source";
import { Repository, UpdateResult } from "typeorm";

interface IStockRepo {
  save: (Stock: Stock) => Promise<Stock>;
  getAll: () => Promise<Stock[]>;
  retrieve: (payload: string) => Promise<Stock | {}>;
  update: (uuid: string, payload: Partial<Stock>) => Promise<UpdateResult>;
  delete: (uuid: string) => Promise<Stock | {}>;
}

class StockRepository implements IStockRepo {
  private repo: Repository<Stock>;

  constructor() {
    this.repo = AppDataSource.getRepository(Stock);
  }

  save = async (Stock: Stock) => await this.repo.save(Stock);

  getAll = async () => await this.repo.find();

  retrieve = async (uuid: string) => {
    const Stock = await this.repo.findOneBy({ uuid: uuid });

    if (Stock) {
      return Stock;
    }
    return {};
  };

  update = async (uuid: string, payload: Partial<Stock>) => {
    return await this.repo.update(uuid, { ...payload });
  };

  delete = async (uuid: string) => {
    const StockToDelete = await this.retrieve(uuid);
    await this.repo.delete(uuid);
    return StockToDelete;
  };
}

export default new StockRepository();
