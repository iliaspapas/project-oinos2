import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Double,
  OneToOne,
  Relation,
} from 'typeorm';
import { OrderItem } from './orderitem';

@Entity()
export class Wine {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  kind: string;

  @Column()
  date: string;

  @Column('numeric')
  price: Double;
}
