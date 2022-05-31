import { IDvd } from "./Dvd.interface";
import { IUser } from "./user.interface";
export interface ICartToPut {}

export interface ICart {
  uuid: string;
  paid: boolean;
  total: number;
  dvds: IDvd[];
  user: IUser;
}
