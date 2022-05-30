import { IStock } from "./stock.entities";

export interface IDvdToPost {
  name: string;
  duration: number;
  quantity: number;
  price: number;
}

export interface IDvd {
  name: string;
  duration: number;
  quantity: number;
  price: number;
  uuid: string;
  stock: IStock;
}
