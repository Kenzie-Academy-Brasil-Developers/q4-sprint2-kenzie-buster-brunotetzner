import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
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

  @ManyToOne((type) => Dvd, (dvd) => dvd.carts)
  dvd: Dvd;
}
