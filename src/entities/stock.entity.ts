import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from "typeorm";
import { v4 as generateUuid } from "uuid";

@Entity("stock")
export class Stock {
  @PrimaryGeneratedColumn("uuid")
  uuid?: string;

  @Column({ nullable: false })
  quantity: number;

  @Column({ nullable: false })
  price: number;
}
