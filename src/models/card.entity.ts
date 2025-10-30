import { Entity, Column, PrimaryColumn } from 'typeorm';
import 'reflect-metadata';

@Entity({ name: 'cards' })
export class CardEntity {
  @PrimaryColumn()
  cardDefId!: string;

  @Column()
  name!: string;

  @Column()
  power!: string;

  @Column()
  cost!: string;

  @Column()
  obtainable!: boolean;

  @Column()
  description!: string;

  @Column()
  releaseDate!: Date;

  @Column()
  shortName!: string;
}
