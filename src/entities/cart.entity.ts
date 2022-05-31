import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
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

  @OneToOne((type) => User, { eager: true })
  @JoinColumn()
  user: User;

  @OneToMany((type) => Dvd, (dvd) => dvd.cart, {
    eager: true,
  })
  dvds: Dvd[];
}
