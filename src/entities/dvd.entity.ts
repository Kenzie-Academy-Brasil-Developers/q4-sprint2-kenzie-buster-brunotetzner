import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { v4 as generateUuid } from "uuid";
import { Cart } from "./cart.entity";
import { Stock } from "./stock.entity";

@Entity("dvds")
export class Dvd {
  @PrimaryGeneratedColumn("uuid")
  uuid?: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  duration: number;

  @ManyToOne((type) => Cart, (cart) => cart.dvd)
  cart?: Cart;

  @OneToOne((type) => Stock, { eager: true, nullable: false })
  @JoinColumn()
  stock: Stock;
}