import { type } from 'os';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  BaseEntity,
  JoinTable,
  Relation,
} from 'typeorm';
import OrderItem from './orderitem';

@Entity()
export default class Order extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  lastName: string;

  @Column()
  status: boolean;

  @ManyToMany(() => OrderItem, (orderItems) => orderItems.order, {
    cascade: true,
  })
  @JoinTable()
  orderItems: OrderItem[];
}
