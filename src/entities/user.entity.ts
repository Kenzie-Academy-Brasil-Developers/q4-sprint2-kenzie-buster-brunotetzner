import {
  Entity,
  OneToMany,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
} from "typeorm";
import { Cart } from "./cart.entity";
@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  uuid?: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ default: false })
  isAdmin: boolean;

  @OneToMany((type) => Cart, (cart) => cart.user)
  @JoinColumn()
  carts?: Cart[];
}
