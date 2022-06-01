import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { v4 as generateUuid } from "uuid";
import { User } from "../entities/user.entity";
import { Dvd } from "./dvd.entity";

@Entity("carts")
export class Cart {
  @PrimaryGeneratedColumn("uuid")
  uuid?: string;

  @Column({ nullable: false })
  total: number;

  @Column({ default: false })
  paid?: boolean;

  @ManyToOne((type) => User, (user) => user.carts)
  user: User;
  @OneToMany((type) => Dvd, (dvd) => dvd.cart, {
    eager: true,
  })
  dvds: Dvd[];
}
