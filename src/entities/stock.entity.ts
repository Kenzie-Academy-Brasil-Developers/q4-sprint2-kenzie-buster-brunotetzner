import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from "typeorm";
import { v4 as generateUuid } from "uuid";
import { Dvd } from "./dvd.entity";

@Entity("stock")
export class Stock {
  @PrimaryGeneratedColumn("uuid")
  uuid?: string;

  @Column({ nullable: false })
  quantity: number;

  @Column({ nullable: false })
  price: number;

  @OneToOne((type) => Dvd, (dvd) => dvd.stock)
  dvd?: Dvd;
}
