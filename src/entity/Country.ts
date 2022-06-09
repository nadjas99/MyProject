import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { currency } from "./currency-interface";
import { idd } from "./idd.interface";

@Entity()
export class Country extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;

  @Column()
  capital: string;

  @Column("varchar")
  callingCode: idd;

  @Column()
  population: number;

  @Column("varchar")
  currency: currency;
}
