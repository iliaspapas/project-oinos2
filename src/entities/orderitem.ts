import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  Relation,
  ManyToMany,
  ManyToOne,
} from 'typeorm';
import { Order } from './order';
import { Wine } from './wines';
@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Wine, (wine) => wine.id)
  @JoinColumn()
  wine: Wine;

  @Column()
  quantity: number;

  @ManyToMany(() => Order, (order) => order.orderItems)
  order: Relation<Order>;
}
